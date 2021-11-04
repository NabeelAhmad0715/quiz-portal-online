const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User, Role } = require('../models');
const { UserQuizAttempt, QuestionBank } = require('../models');

const tokenList = {};

const index = async (_req, res, _next) => {
  try {
    const users = await User.findAll({
      tableName: 'users',
      include: [
        {
          model: Role,
          as: 'roles',
        },
        {
          model: UserQuizAttempt,
          as: 'user_quiz_attempts',
        },
        {
          model: QuestionBank,
          as: 'question_banks',
        },
      ],
      order: [
        ['createdAt', 'DESC'],
        [{ model: Role, as: 'roles' }, 'createdAt', 'DESC'],
        [
          { model: UserQuizAttempt, as: 'user_quiz_attempts' },
          'createdAt',
          'DESC',
        ],
        [{ model: QuestionBank, as: 'question_banks' }, 'createdAt', 'DESC'],
      ],
      attributes: {
        exclude: ['password'],
      },
    });
    return res.status(200).json(users);
  } catch (err) {
    console.log(err);
    return res.status(400).json(err);
  }
};

const changePassword = async (req, res, _next) => {
  try {
    const { password, newPassword } = await req.body;
    const user = await User.findByPk(req.body.id, {
      include: [
        {
          model: Role,
          as: 'roles',
        },
      ],
    });
    if (!user) {
      return res.status(404).json({
        message: 'User Not Found',
      });
    }
    return await bcrypt.compare(password, user.password, (error, response) => {
      if (error) {
        return res.status(400).json({ message: error, success: false });
      }
      if (response) {
        const hashPassword = bcrypt.hashSync(
          newPassword,
          bcrypt.genSaltSync(16),
          null,
        );
        user.update({
          password: hashPassword,
        });
        return res.status(200).json(user);
      }
      return res
        .status(400)
        .json({ message: 'Password Not Matched', success: false });
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json(err);
  }
};

const show = async (req, res, _next) => {
  try {
    const user = await User.findByPk(req.params.id, {
      include: [
        {
          model: Role,
          as: 'roles',
        },
      ],
    });
    if (!user) {
      return res.status(404).json({
        message: 'User Not Found',
      });
    }
    return res.status(200).json(user);
  } catch (err) {
    return res.status(400).json(err);
  }
};

const store = async (req, res, _next) => {
  try {
    const { name, email } = await req.body;
    const user = await User.create({
      name,
      email,
      password: bcrypt.hashSync(
        req.body.password,
        bcrypt.genSaltSync(16),
        null,
      ),
      role_id: req.body.role_id,
    });
    return res.status(200).json(user);
  } catch (err) {
    return res.status(400).json(err);
  }
};

const update = async (req, res, _next) => {
  try {
    const { name, email, role_id: roleId } = await req.body;
    const user = await User.findByPk(req.body.id, {
      include: [
        {
          model: Role,
          as: 'roles',
        },
      ],
    });
    if (!user) {
      return res.status(404).json({
        message: 'User Not Found',
      });
    }
    await user.update({
      name: name || User.name,
      email: email || User.email,
      role_id: roleId || User.role_id,
    });
    return res.status(200).json(user);
  } catch (err) {
    return res.status(400).json(err);
  }
};

const destroy = async (req, res, _next) => {
  try {
    const user = await User.findByPk(req.body.id);
    if (!user) {
      return res.status(404).json({
        message: 'User Not Found',
      });
    }
    await user.destroy();
    return res.status(200).json({ message: 'User Deleted Successfully' });
  } catch (err) {
    return res.status(400).json(err);
  }
};

const generateAccessToken = (user) => {
  return jwt.sign(
    {
      user_id: user.id,
      role_id: user.role_id,
      email: user.email,
    },
    process.env.SECRET,
    { expiresIn: 60 },
  );
};

const generateRefreshToken = (user) => {
  return jwt.sign(
    {
      user_id: user.id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_LIFE,
    },
  );
};

const login = async (req, res, _next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      const token = generateAccessToken(user);
      const refreshToken = generateRefreshToken(user);
      const result = {
        name: user.name,
        email: user.email,
        role: user.role_id,
        token: `Bearer ${token}`,
        expiresIn: process.env.TOKEN_LIFE,
        refresh: refreshToken,
        refreshExpireIn: process.env.REFRESH_TOKEN_LIFE,
      };
      tokenList[refreshToken] = result;

      return res.status(200).json(result);
    }
    return res.status(400).json({ message: 'Invalid Password' });
  } catch (err) {
    console.log(err);
    return res.status(400).json(err);
  }
};

const token = async (req, res) => {
  // refresh the damn token

  const data = req.body;
  // if refresh token exists
  if (data.refreshToken && data.refreshToken in tokenList) {
    const user = await User.findOne({ where: { email: data.email } });
    const accessToken = `Bearer ${generateAccessToken(user)}`;

    const response = {
      accessToken,
    };
    // update the token in the list
    tokenList[data.refreshToken].accessToken = accessToken;
    res.status(200).json(response);
  } else {
    res.status(404).send('Invalid request');
  }
};
const register = async (req, res, _next) => {
  try {
    const { name, email, role_id: roleId } = await req.body;
    const user = await User.create({
      name,
      email,
      password: bcrypt.hashSync(
        req.body.password,
        bcrypt.genSaltSync(16),
        null,
      ),
      roleId,
    });
    return res.status(200).json(user);
  } catch (err) {
    return res.status(400).json(err);
  }
};

module.exports = {
  index,
  show,
  store,
  update,
  destroy,
  changePassword,
  register,
  login,
  token,
};
