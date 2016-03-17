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
        if (req.body.userType === 'Driver') {
          trip.driverId = req.session.userId;
        }
        else if (req.body.userType === 'Rider') {
          trip.riderId = req.session.userId;
        }
        console.log(trip);
    		Trip.create(trip, function(err, trip){
    			if (err) res.status(500).send();
          var id = req.session.userId;
          User.findById(id, function(err, user){
            console.log(user.trips);
            user.trips.push(trip);
            console.log(user);
            user.save();
          });
    			res.status(201).send(JSON.stringify(trip));
    		});
      }
    });
  },
  showTrip: function( req, res ) {
    var id = req.params.id;
    console.log("it works!",id);
    Trip.findById(id, function(err, trip){
      res.render('./partials/trips/show', { trip: JSON.stringify(trip) });
    });
  },
  tripsApi: function(req, res) {
    Trip.find({}, function(err, trips){
      if (err) res.status(500).send();
      res.status(200).send(JSON.stringify(trips));
    });
  },
  updateTrip: function(req, res) {
    var id = req.params.id;
    Trip.findById(id, function(err, trip){
      if (err) return console.log(err);
      trip.fromLocation = parseInt(req.body.fromLocation);
      trip.toLocation = parseInt(req.body.toLocation);
      trip.save(function(err, updatedTrip){
      res.send();
      });
    });
  }
};

module.exports = tripsController;
