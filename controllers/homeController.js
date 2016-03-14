var User = require('../models/user');
var Trip = require('../models/trip');

function home(req, res){
  res.render("./partials/home");
}

module.exports = {home:home};
