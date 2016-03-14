var User = require('../models/user');
var Trip = require('../models/trip');

var tripsController = {
  newTrip: function(req, res){
    res.render('./partials/trips/new');
  },
  createTrip: function(req, res){
		console.log('creating');
		var fromLocation = req.body.fromLocation;
		var toLocation = req.body.toLocation;
		Trip.create({
			fromLocation: fromLocation,
      toLocation: toLocation
		}, function(err, trip){
			if (err) res.status(500).send();
			res.status(201).send(JSON.stringify(trip));
		});
	}
};

module.exports = tripsController;
