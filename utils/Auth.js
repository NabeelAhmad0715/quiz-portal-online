const passport = require('passport');
const { Role } = require('../models');

const userAuth = passport.authenticate('jwt', { session: false });

const checkRole = (roles) => async (req, res, next) => {
  const role = await Role.findOne({ where: { id: req.user.role_id } });
  if (roles.includes(role.name)) {
    next();
  } else {
    return res.status(401).json('Unauthorized');
  }
  return true;
};
module.exports = {
  userAuth,
  checkRole,
};
