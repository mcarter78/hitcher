var User = require('../models/user');
var Trip = require('../models/trip');

function home(req, res){
  res.send("hello");
}

module.exports = {home:home};
