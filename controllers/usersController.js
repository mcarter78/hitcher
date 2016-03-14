var User = require('../models/user');
var Trip = require('../models/trip');
var bcrypt = require('bcrypt');

var usersController = {
	newUser: function (req, res){
		res.render('./partials/users/new');
	},
	createUser: function(req, res){
		console.log('creating');
		var name = req.body.name;
		var email = req.body.email;
		var passwordDigest = req.body.passwordDigest; //TODO: bcrypt stuff;
		var mobileNumber = req.body.mobileNumber;
		var imageUrl = req.body.imageUrl;
		User.create({
			name: name,
			email: email,
			passwordDigest: passwordDigest,
			mobileNumber: mobileNumber,
			imageUrl: imageUrl
		}, function(err, user){
			if (err) res.status(500).send();
			res.status(201).send(JSON.stringify(user));
		});
	},
};

module.exports = usersController;
