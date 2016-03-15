var User = require('../models/user');
var Trip = require('../models/trip');

var tripsController = {
  newTrip: function(req, res){
    req.currentUser(function(err, user){
      console.log('Current User:', user);
      if(user === null){
        res.redirect('/login');
      } else {
      res.render('./partials/trips/new');
      }
		});

  },

  createTrip: function(req, res){
    req.currentUser(function(err, user){
			console.log('Current User:', user);
      if (user === null){
        res.redirect('/login');
      } else {

        var trip = {};
    		trip.fromLocation = req.body.fromLocation;
    		trip.toLocation = req.body.toLocation;
        // set Trips id's based on whether user choses driver or rider
        console.log(req.session.userId);
        if (req.body.userType === 'Driver') {
          trip.driverId = req.session.userId;
        }
        else if (req.body.userType === 'Rider') {
          trip.riderId = req.session.userId;
        }
        console.log(trip);
    		Trip.create(trip, function(err, trip){
    			if (err) res.status(500).send();
    			res.status(201).send(JSON.stringify(trip));
    		});
	     }
     });
   }
};

module.exports = tripsController;
