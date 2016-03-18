var User = require('../models/user');
var Trip = require('../models/trip');

var homeController = {
  home: function(req, res){
    // render the splash page
    res.render("./partials/home");
  },
  nav: function(req, res){
    // if logged in user exists...
    if (req.user) {
      // send back the string 'user' -- do not send
      // the user object, because it will display
      // at '/checkuser' and expose that users info
      res.send('user');
    }
    else {
      // otherwise send null, this will come back
      // to the requesting function as an empty string
      res.send(null);
    }
  },
  help: function(req, res){
    // render the 'How it Works' page
    res.render('./help');
  },
  contact: function(req, res){
    // render the 'Contact' page
    res.render('./contact');
  }

};

module.exports = homeController;
