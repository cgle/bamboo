var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema({
  username: {type: String, lowercase: true},
  fullname: {type: String, default: ''},
  description: {type: String, default: ''},
  tags: [{type: String, lowercase: true}],
  followings: {type: Number, default: 0},
  followers: {type: Number, default: 0}
});

var exports = module.exports = mongoose.model('User', User);
