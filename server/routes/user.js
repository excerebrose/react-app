const User = require('../controllers/user.controller');

module.exports = (app, passport) => {
  app.post('/api/login',
    passport.authenticate('local', {}),
    User.login);
  app.post('/api/create', User.create);
  app.get('/api/logout', User.logout);
  app.get('/api/list', User.userList);
  app.get('/user', User.details);
};
