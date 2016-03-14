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
		user.passwordDigest = req.body.passwordDigest; //TODO: bcrypt stuff;
		user.mobileNumber = req.body.mobileNumber;
		user.imageUrl = req.body.imageUrl;

		User.createSecure(user,
			// name: name,	
			// email: email,
			// passwordDigest: passwordDigest,
			// mobileNumber: mobileNumber,
			// imageUrl: imageUrl
		 function(err, user){
			if (err) res.status(500).send();
			res.status(201).send(JSON.stringify(user));
		});
	},
};

module.exports = usersController;
