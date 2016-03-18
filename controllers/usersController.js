var User = require('../models/user');
var Trip = require('../models/trip');
var bcrypt = require('bcrypt');

var usersController = {
	newUser: function (req, res){
		// render the new user form page
		res.render('./partials/users/new');
	},
	createUser: function(req, res){
		// create a new user object
		var user = {};
		// pass in values from the form
		user.name = req.body.name;
		user.email = req.body.email;
		user.password = req.body.password;
		user.mobileNumber = req.body.mobileNumber;
		user.imageUrl = req.body.imageUrl;
		// create a secure user with hashed password
		User.createSecure(user, function(err, userData) {
			// log the new user in
			req.login(userData);
			// sanity check to log the user after login
			req.currentUser(function(err, otherUser){
				console.log("ITS ME",otherUser);
			});
			if (err) res.status(500).send();
			res.status(201).send();
		});
	},
	loginUser: function(req, res){
		// render the login form page
		res.render('login');
	},
	authenticateUser: function(req, res){
		// collect the data from login form
		var email = req.body.email;
		var password = req.body.password;
		// authenticate user
		User.authenticate(email, password, function(err, user){
			// login the user
			req.login(user);
			// sanity check to log the newly logged in user
			req.currentUser(function(err, otherUser){
				console.log("ITS ME",otherUser);
			});
			res.status(200).send();
		});
	},
	logoutUser: function(req, res){
		// logout the user
		req.logout();
		// sanity check to make sure user is logged out
		req.currentUser(function(err, otherUser){
			console.log("ITS ME",otherUser);
		});
		// redirect to root
		res.redirect('/');
	},
	//render riders
	indexUsers: function(req, res){
    //Find all users
    User.find({}, function(err,users){
    //Finds logged in user
    var id = req.session.userId;
		// creates empty array to collect response data
    var sendUsers = [];
		User.findById(id, function(err, user){
			// iterate through each user
			for(var i = 0; i < users.length; i++){
				// if user has no trips...
		    if ((users[i].trips[0] === undefined) || (user.trips[0] === undefined)) {
					// skip that one
		      continue;
		    }
				// if user is the logged in user
		    else if (users[i]._id == id){
	        // skip that one
	        continue;
		    }
				// if that user's trip has no rider (user is a driver)
		    else if (users[i].trips[0].riderId === undefined){
					// skip that one
			    continue;
		    }
				// if the user's from & to locations match the logged in user's...
		    else if((users[i].trips[0].fromLocation === user.trips[0].fromLocation)&&
		        (users[i].trips[0].toLocation === user.trips[0].toLocation)){
		      // push that user into the response array
		    	sendUsers.push(users[i]);
		    }
			}
			// render the index page and send back data for the logged in user, and the response array with matched riders
	  	res.render('./partials/trips/index', { loggedInUser: JSON.stringify(user), allUsers: JSON.stringify(sendUsers)});
	    });
    });
  }
};

module.exports = usersController;
