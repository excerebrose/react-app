const Boom = require('boom');
const User = require('../models/user').User;

// Create User
exports.create = (req, res) => {
  User.create(req.body, (err, result) => {
    if (err) {
      if (err.code === 11000){
        return res.json({ error: 'Email already exist!' });
      }
      return res.send(Boom.badImplementation(err));
    }
    return res.json({ status: 'Successful Registration' });
  });
};

// Login
exports.login = (req, res) => {
  if (req.user === 'Unknown user') {
    return res.json({ error: 'Not Exist' });
  }
  else if (req.user === 'Invalid password') {
    return res.json({ error: 'Invalid Username and Password' });
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

exports.details = (req, res) => {
  if (req.isAuthenticated()) {
    return res.json(req.user);
  }
  else {
    return res.json({status: 'Not logged in'});
  }
};

exports.userList = (req, res) => {
  User.find({}, (err, users) => {
    const userMap = {
      names: [],
    };
    users.forEach((user) => {
      userMap.names.push(user.name);
    });
    console.log(userMap);
    res.json(userMap);
  });
};
