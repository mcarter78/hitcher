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
    var userId = req.user._id;
    Trip.findById(id, function(err, trip){
      trip.driverId = userId;
      trip.save(function(err, updatedTrip){
        User.findById(updatedTrip.riderId, function(err, rider){
          rider.trips[0].driverId = userId;
          rider.save();
          User.findById(updatedTrip.driverId, function(err, driver){
            res.render('./partials/trips/show', { trip: JSON.stringify(updatedTrip),
              rider: JSON.stringify(rider), driver: JSON.stringify(driver) });
          });
        });
      });
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
  },
  deleteTrip: function(req, res) {
    var id = req.params.id;
    console.log(id);
    Trip.findByIdAndRemove({_id: id}, function(err){
        if (err) res.status(500).send();
    });
    // res.redirect('./partials/trips/new');
  },
  checkForDriver: function(req, res){
    var id = req.user._id;
    console.log(id);
    User.findById(id, function(err, rider){
      if (rider.trips[0].driverId === undefined){
        res.send(null);
      } else {
        User.findById(rider.trips[0].driverId, function(err, driver){
          res.send(driver.trips[0]._id);
        });

      }
    });
  },
  completeTrip: function(req, res) {
    res.render('./partials/trips/here');
  }
};

module.exports = tripsController;
