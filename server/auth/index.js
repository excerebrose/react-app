const User = require('../models/user').User;
const local = require('./auth-local');

module.exports = (passport) => {
  // serialize sessions
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findOne({ _id: id }, (err, user) => {
      done(err, user);
    });
  });
  // use these strategies
  passport.use(local);
};
