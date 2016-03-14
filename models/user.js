var mongoose = require('mongoose');
var TripSchema = require('./trip');

var UserSchema = new mongoose.Schema({
  email: {type: String, required: true },
  name: {type: String, required: true },
  passwordDigest: {type: String, required: true },
  imageUrl: String,
  mobileNumber: String,
  thumbs: Number,
  trips: [TripSchema],
  createdAt: { type: Date, default: Date.now() }
});

var User = mongoose.model('User', UserSchema);

module.exports = User;
