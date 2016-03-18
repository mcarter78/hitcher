var mongoose = require('mongoose');

var TripSchema = new mongoose.Schema({
  fromLocation: {type: Number, required: true},
  toLocation: {type: Number, required: true},
  driverId: String,
  riderId: String,
  isActive: {type: Boolean, default: false},
  createdAt: { type: Date, default: Date.now() }
});

var Trip = mongoose.model('Trip', TripSchema);

module.exports = Trip;
