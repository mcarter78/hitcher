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
			console.log(user);
			console.log(userData);
			if (err) res.status(500).send();
			res.status(201).send(JSON.stringify(userData));
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
			res.status(200).send();  
		});
	}
};

module.exports = usersController;
