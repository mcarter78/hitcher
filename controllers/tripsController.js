var User = require('../models/user');
var Trip = require('../models/trip');

var tripsController = {
  newTrip: function(req, res){
    req.currentUser(function(err, user){
      console.log(user);
      if(user === null){
        res.redirect('/login');
      } else {
      res.render('./partials/trips/new');
      }
		});

  },
  createTrip: function(req, res){
    // TODO: check if user is logged in, if not redirect to login


    var trip = {};
		console.log('creating');
		trip.fromLocation = req.body.fromLocation;
		trip.toLocation = req.body.toLocation;

    // TODO: set Trips id's based on whether user choses driver or rider
    // if (req.body.userType) === 'Driver' {
    //  trip.driverId = currentUser.id
    // }
    // else if (req.body.userType) === 'Rider' {
    //   trip.riderId = currentUser.id
    // }

		Trip.create(trip, function(err, trip){
			if (err) res.status(500).send();
			res.status(201).send(JSON.stringify(trip));
		});
	}
};

module.exports = tripsController;
