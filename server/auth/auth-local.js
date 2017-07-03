const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user').User;


module.exports = new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password',
  },
  (email, password, done) => {
    const options = {
      criteria: { email },
      select: 'name email hashed_password salt',
    };
    User.load(options, (err, user) => {
      if (err) return done(err);
      if (!user) {
        return done(null, false, { message: 'Unknown user' });
      }
      if (!user.authenticate(password)) {
        return done(null, false, { message: 'Invalid password' });
      }
      return done(null, user);
    });
  }
);
