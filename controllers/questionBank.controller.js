const { QuestionBank } = require('../models');
const { User } = require('../models');
const { Question } = require('../models');

const index = async (req, res, _next) => {
  try {
    const questionBanks = await QuestionBank.findAll({
      tableName: 'question_banks',
      include: [
        {
          model: User,
          as: 'users',
          where: { id: req.body.user_id },
        },
        {
          model: Question,
          as: 'questions',
        },
      ],
      order: [
        ['createdAt', 'DESC'],
        [{ model: User, as: 'users' }, 'createdAt', 'DESC'],
        [{ model: Question, as: 'questions' }, 'createdAt', 'DESC'],
      ],
    });
    return res.status(200).json(questionBanks);
  } catch (err) {
    console.log(err);
    return res.status(400).json(err);
  }
};

const show = async (req, res, _next) => {
  try {
    const { id, user_id: userId } = req.body;
    console.log(userId, id);
    const questionBank = await QuestionBank.findByPk(id, {
      include: [
        {
          model: User,
          as: 'users',
          where: { id: userId },
        },
        {
          model: Question,
          as: 'questions',
        },
      ],
      order: [
        ['createdAt', 'DESC'],
        [{ model: User, as: 'users' }, 'createdAt', 'DESC'],
        [{ model: Question, as: 'questions' }, 'createdAt', 'DESC'],
      ],
    });
    if (!questionBank) {
      return res.status(404).json({
        message: 'Question bank Not Found',
      });
    }
    return res.status(200).json(questionBank);
  } catch (err) {
    return res.status(400).json(err);
  }
};

const store = async (req, res, _next) => {
  try {
    const { name, type, user_id: userId } = req.body;
    const questionBank = await QuestionBank.create({
      name,
      type,
      user_id: userId,
    });
    return res.status(200).json(questionBank);
  } catch (err) {
    return res.status(400).json(err);
  }
};

const update = async (req, res, _next) => {
  try {
    const { name, type, user_id: userId } = req.body;
    const questionBank = await QuestionBank.findByPk(req.body.id, {
      include: [
        {
          model: User,
          as: 'users',
          where: { id: userId },
        },
        {
          model: Question,
          as: 'questions',
        },
      ],
      order: [
        ['createdAt', 'DESC'],
        [{ model: User, as: 'users' }, 'createdAt', 'DESC'],
        [{ model: Question, as: 'questions' }, 'createdAt', 'DESC'],
      ],
    });
    if (!questionBank) {
      return res.status(404).json({
        message: 'Question Bank Not Found',
      });
    }
    await questionBank.update({
      name: name || QuestionBank.name,
      type: type || QuestionBank.type,
      user_id: userId || QuestionBank.user_id,
    });
    return res.status(200).json(questionBank);
  } catch (err) {
    return res.status(400).json(err);
  }
};

const destroy = async (req, res, _next) => {
  try {
    const questionBank = await QuestionBank.findByPk(req.body.id);
    if (!questionBank) {
      return res.status(404).json({
        message: 'Question Bank Not Found',
      });
    }
    await questionBank.destroy();
    return res
      .status(200)
      .json({ message: 'Question Bank Deleted Successfully' });
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
};
