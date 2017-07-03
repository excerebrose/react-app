const User = require('../controllers/user.controller');

module.exports = (app, passport) => {
  app.post('/login',
    passport.authenticate('local', {}),
    User.login);
  app.post('/create', User.create);
  app.get('/logout', User.logout);
  app.get('/api/list', User.userList);
};
