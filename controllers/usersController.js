var User = require('../models/user');
var Trip = require('../models/trip');
var bcrypt = require('bcrypt');

var usersController = {
	newUser: function (req, res){
		res.render('./partials/users/new');
	},
	createUser: function(req, res){
		console.log('creating');
		var user = {};
		user.name = req.body.name;
		user.email = req.body.email;
		user.password = req.body.password;
		user.mobileNumber = req.body.mobileNumber;
		user.imageUrl = req.body.imageUrl;
		User.createSecure(user, function(err, userData) {
			console.log(userData);
			req.login(userData);
			req.currentUser(function(err, otherUser){
				console.log("ITS ME",otherUser);
			});
			if (err) res.status(500).send();
			res.status(201).send();
		});
	},
	loginUser: function(req, res){
		res.render('login');
	},
	authenticateUser: function(req, res){
		console.log(req.body);
		var email = req.body.email;
		var password = req.body.password;
		// authenticate user
		User.authenticate(email, password, function(err, user){
			req.login(user);
			req.currentUser(function(err, otherUser){
				console.log("ITS ME",otherUser);
			});
			res.status(200).send();
		});
	},
	logoutUser: function(req, res){
		req.logout();
		req.currentUser(function(err, otherUser){
			console.log("ITS ME",otherUser);
		});
		res.redirect('/');
	},
	//render riders
	indexUsers: function(req, res){
      console.log("indexing");
	    //Find all users
	    User.find({}, function(err,users){
      //Finds logged in user
      var id = req.session.userId;
      var sendUsers = [];
				User.findById(id, function(err, user){
					//PASTING
					for(var i = 0; i < users.length; i++){
						console.log(users[i]._id);
						console.log(id);
				    if ((users[i].trips[0] === undefined) || (user.trips[0] === undefined)) {
				        continue;
				    }
				    else if (users[i]._id == id){
				        console.log('USER MATCH', user[i]);
				        continue;
				    }
				    else if (users[i].trips[0].riderId === undefined){
					    	continue;
				    }
				    else if((users[i].trips[0].fromLocation === user.trips[0].fromLocation)&&
				        (users[i].trips[0].toLocation === user.trips[0].toLocation)){
				            // console.log("WE HAVE A MATCH:", users[i]);
				    sendUsers.push(users[i]);
				    }
					}
				//ends pasting
		  			res.render('./partials/trips/index', { loggedInUser: JSON.stringify(user), allUsers: JSON.stringify(sendUsers)});
		    });
	    }); /*Find all users ends here */
  }
};

module.exports = usersController;
