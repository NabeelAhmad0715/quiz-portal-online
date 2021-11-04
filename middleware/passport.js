const { Strategy, ExtractJwt } = require('passport-jwt');
const { User } = require('../models');

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET,
};

const authorize = (passport) => {
  return passport.use(
    new Strategy(options, async (payload, done) => {
      try {
        const expirationDate = new Date(payload.exp * 1000);
        if (expirationDate < new Date()) {
          return done(null, false);
        }
        const user = await User.findByPk(payload.user_id);
        if (user) {
          return done(null, user);
        }
        return done(null, false);
      } catch (error) {
        return done(error, false);
      }
    }),
  );
};
module.exports = authorize;
