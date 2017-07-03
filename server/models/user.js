const mongoose = require('mongoose');
const userPlugin = require('mongoose-user');
const Schema = mongoose.Schema;
const crypto = require('crypto');

// User Schema
const UserSchema = new Schema({
  name: { type: String, default: '', required: true },
  email: { type: String, default: '', unique: true, required: true },
  gender: { type: String, default: '', required: true },
  hashed_password: { type: String, default: '', required: true },
  salt: { type: String, default: '' },
});

UserSchema
  .virtual('password')
  .set(function(password) {
    this._password = password;
    this.salt = this.makeSalt();
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function() { return this._password });

UserSchema.statics = {
   load: function (options, cb) {
      options.select = options.select;
      this.findOne(options.criteria)
        .select(options.select)
        .exec(cb);
    },
    create: function(data, callback) {
        var user = new this(data);
        user.save(callback);
    },
    get: function(id, callback) {
        this.findOne(id, callback);
    }
};

const validatePresenceOf = function (value) {
  return value && value.length;
};

UserSchema.methods = {
  /**
   * Authenticate - check if the passwords are the same
   *
   * @param {String} plainText
   * @return {Boolean}
   * @api public
   */

  authenticate: function (plainText) {
    return this.encryptPassword(plainText) === this.hashed_password;
  },

  /**
   * Make salt
   *
   * @return {String}
   * @api public
   */

  makeSalt: function () {
    return Math.round((new Date().valueOf() * Math.random())) + '';
  },

  /**
   * Encrypt password
   *
   * @param {String} password
   * @return {String}
   * @api public
   */

  encryptPassword: function (password) {
    if (!password){
      return '';
    } 
    try {
      return crypto
        .createHmac('sha1', this.salt)
        .update(password)
        .digest('hex');
    } catch (err) {
      return '';
    }
  },
};

const user = mongoose.model('User', UserSchema);
/** export schema */
module.exports = {
  User: user,
};
