const Boom = require('boom');
const User = require('../models/user').User;

// Create User
exports.create = (req, res) => {
  User.create(req.body, (err, result) => {
    if (err) {
      if (err.code === 11000){
        return res.json({data: 'email already exist'});
      }
      return res.send(Boom.badImplementation(err));
    }
    return res.json(result);
  });
};

// Login
exports.login = (req, res) => {
  if (req.user === 'Unknown user') {
    return res.json({ status: 'Not Exist' });
  }
  else if (req.user === 'Invalid password') {
    return res.json({status: 'Invalid Username and Password'});
  }
  else {
    return res.json(req.user);
  }
};

/**
 * Logout
 */

exports.logout = (req, res) => {
  req.logout();
  return res.json(req.user);
};

/** authentication check. */
exports.authCallback = (req, res) => {
  return res.json(req.user);
};

