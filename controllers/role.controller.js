const { User } = require('../models');
const { Role } = require('../models');

const index = async (_req, res, _next) => {
  try {
    const roles = await Role.findAll({
      tableName: 'roles',
      include: [
        {
          model: User,
          as: 'users',
        },
      ],
      order: [
        ['createdAt', 'DESC'],
        [{ model: User, as: 'users' }, 'createdAt', 'DESC'],
      ],
    });
    return res.status(200).json(roles);
  } catch (err) {
    return res.status(400).json(err);
  }
};

const show = async (req, res, _next) => {
  try {
    const role = await Role.findByPk(req.params.id, {
      include: [
        {
          model: User,
          as: 'users',
        },
      ],
    });
    if (!role) {
      return res.status(404).json({
        message: 'Role Not Found',
      });
    }
    return res.status(200).json(role);
  } catch (err) {
    return res.status(400).json(err);
  }
};

const store = async (req, res, _next) => {
  try {
    const { name } = req.body;
    const role = await Role.create({
      name,
    });
    return res.status(200).json(role);
  } catch (err) {
    return res.status(400).json(err);
  }
};

const update = async (req, res, _next) => {
  try {
    const { name, id } = req.body;
    const role = await Role.findByPk(id, {
      include: [
        {
          model: User,
          as: 'users',
        },
      ],
    });
    if (!role) {
      return res.status(404).json({
        message: 'Role Not Found',
      });
    }
    await role.update({
      name: name || role.name,
    });
    return res.status(200).json(role);
  } catch (err) {
    return res.status(400).json(err);
  }
};

const destroy = async (req, res, _next) => {
  try {
    const role = await Role.findByPk(req.body.id);
    if (!role) {
      return res.status(404).json({
        message: 'Role Not Found',
      });
    }
    await role.destroy();
    return res.status(200).json({ message: 'Role Deleted Successfully' });
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
