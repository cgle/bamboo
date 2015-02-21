var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Follow = new Schema({
  broadcaster: {type: mongoose.Schema.ObjectId, ref: 'User'},
  follower: {type: mongoose.Schema.ObjectId, ref: 'User'},
});

var exports = module.exports = mongoose.model('Follow', Follow);
