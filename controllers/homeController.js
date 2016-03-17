var User = require('../models/user');
var Trip = require('../models/trip');

var homeController = {
  home: function(req, res){
    res.render("./partials/home");
  },
  nav: function(req, res){
    if (req.user) {
      res.send('user');
    }
    else {
      res.send(null);
    }
  },
  help: function(req, res){
    res.render('./help');
  },
  contact: function(req, res){
    res.render('./contact');
  }

};

module.exports = homeController;
