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
		user.password = req.body.password; //TODO: bcrypt stuff;
		user.mobileNumber = req.body.mobileNumber;
		user.imageUrl = req.body.imageUrl;
		User.createSecure(user, function(err, userData) {
			console.log(user);
			console.log(userData);
			if (err) res.status(500).send();
			res.status(201).send(JSON.stringify(userData));
		});
	},
};

module.exports = usersController;
