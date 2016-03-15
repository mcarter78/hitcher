var User = require('../models/user');
var Trip = require('../models/trip');

var homeController = {
  home: function(req, res){
    res.render("./partials/home");
  }
};

module.exports = homeController;
