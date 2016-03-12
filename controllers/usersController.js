var User = require('../models/user');
var routes = require('../config/routes');
var server = require('../server');
var bcrypt = require('bcrypt');

var userController = {
	new: function(req, res){
		res.render('./users/new');
	},
	create: function(req, res){
		var name = req.body.name;
		var email = req.body.email;
		var passwordDigest = req.body.password; //TODO: bcrypt stuff;
		var mobileNumber = req.body.mobileNumber;
		var imageUrl = req.body.imageUrl;
		User.create({
			name: name,
			email: email,
			passwordDigest: passwordDigest,
			mobileNumber: mobileNumber,
			imageUrl: imageUrl
		}, function(err, user){
			err ?
				res.status(500).send() :
				res.status(201).send(JSON.stringify(user));
		});
	},
};

module.exports = userController;
