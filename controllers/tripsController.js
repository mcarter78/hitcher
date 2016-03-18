var User = require('../models/user');
var Trip = require('../models/trip');

// this page can be refactored to replace any occurance of req.currentUser function
// with a check to see if req.user is true

var tripsController = {
  newTrip: function(req, res){
    req.currentUser(function(err, user){
      // if user is not logged in...
      if(user === null){
        // redirect to login
        res.redirect('/login');
      } else {
        // redirect to create trip
        res.render('./partials/trips/new');
      }
		});
  },
  createTrip: function(req, res){
    req.currentUser(function(err, user){
      // if user is not logged in...
      if (user === null){
        // redirect to login
        res.redirect('/login');
      } else {
        // create a trip object
        var trip = {};
        // set from and to locations
    		trip.fromLocation = req.body.fromLocation;
    		trip.toLocation = req.body.toLocation;
        // set trip's id's based on whether user choses driver or rider
        if (req.body.userType === 'Driver') {
          trip.driverId = req.session.userId;
        }
        else if (req.body.userType === 'Rider') {
          trip.riderId = req.session.userId;
        }
        // pass the completed trip object into create method
    		Trip.create(trip, function(err, trip){
    			if (err) res.status(500).send();
          // get the logged in user's id
          var id = req.session.userId;
          // find that user in the database
          User.findById(id, function(err, user){
            // add the trip to that user's trips
            user.trips.push(trip);
            user.save();
          });
          // send the trip object back as response
    			res.status(201).send(JSON.stringify(trip));
    		});
      }
    });
  },
  showTrip: function( req, res ) {
    // get the trip id
    var id = req.params.id;
    // get the logged in user's id
    var userId = req.user._id;
    // find the trip in the database
    Trip.findById(id, function(err, trip){
      // set the trip's driverId to that of the logged in user
      trip.driverId = userId;
      trip.save(function(err, updatedTrip){
        // find the rider associated with the trip
        User.findById(updatedTrip.riderId, function(err, rider){
          // set the rider's trip driverId also
          rider.trips[0].driverId = userId;
          rider.save();
          // find the driver associated with the trip
          User.findById(updatedTrip.driverId, function(err, driver){
            // render the show view, passing in data for the newly updated trip,
            // the rider, and the driver
            res.render('./partials/trips/show', { trip: JSON.stringify(updatedTrip),
              rider: JSON.stringify(rider), driver: JSON.stringify(driver) });
          });
        });
      });
    });
  },
  tripsApi: function(req, res) {
    // find all trips
    Trip.find({}, function(err, trips){
      if (err) res.status(500).send();
      // send back the trips as JSON data
      res.status(200).send(JSON.stringify(trips));
    });
  },
  updateTrip: function(req, res) {
    // get the trip's id
    var id = req.params.id;
    // find that trip in the database
    Trip.findById(id, function(err, trip){
      if (err) return console.log(err);
      // set that trip's location to the new form locations
      trip.fromLocation = parseInt(req.body.fromLocation);
      trip.toLocation = parseInt(req.body.toLocation);
      trip.save(function(err, updatedTrip){
      res.send();
      });
    });
  },
  deleteTrip: function(req, res) {
    // get the trip's id
    var id = req.params.id;
    // find and remove that trip from the database
    Trip.findByIdAndRemove({_id: id}, function(err){
        if (err) res.status(500).send();
    });
  },
  checkForDriver: function(req, res){
    // get the logged in user's id
    var id = req.user._id;
    // find that user in the database
    User.findById(id, function(err, user){
      // if that user's trip has no driver
      if (user.trips[0].driverId === undefined){
        // send back null (empty string)
        res.send(null);
      } else {
        // find the driver in the users database
        User.findById(user.trips[0].driverId, function(err, driver){
          // THIS CODE IS BROKEN, SEEMS TO SEND THE WRONG #
          // THIS IS THE CODE THAT CONNECTS OUR DRIVER & RIDER
          // send back that driver's trip's id
          res.send(driver.trips[0]._id);
        });
      }
    });
  },
  completeTrip: function(req, res) {
    // render the trip completed page
    res.render('./partials/trips/here');
  }
};

module.exports = tripsController;
