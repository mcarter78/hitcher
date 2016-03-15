// required
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var hbs = require('hbs');
var hbsutils = require('hbs-utils')(hbs);
var session = require('express-session');
var keygen = require('keygenerator');
var port = process.env.PORT || 3000;
var User = require('./models/user');
var logger = require('morgan');

//middleware
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(logger('dev'));

// create the session
app.use(
  session({
    secret: keygen._({specials: true}),
    resave: false,
    saveUninitialized: true
  })
);

// extending the 'req' obj to help manage sessions
app.use(function(req, res, next){
  //login user
  req.login = function(user) {
    req.session.userId = user._id;
  };
  // find current user
  req.currentUser = function (cb) {
    User.findOne({ _id: req.session.userId },
    function(err, user){
      req.user = user;
      cb(null, user);
      });
  };
  // log out current user
  req.logout = function() {
    req.session.userId = null;
    req.user = null;
  };
  // call the next middleware in the stack
  next();
});

//controllers
var homeController = require('./controllers/homeController');
var usersController = require('./controllers/usersController');
var tripsController = require('./controllers/tripsController');


//routes
app.get('/', homeController.home);
app.get('/users/new', usersController.newUser);
app.post('/users', usersController.createUser);
app.get("/login", usersController.loginUser);
app.post('/login', usersController.authenticateUser);
app.get('/trips/new', tripsController.newTrip);
app.post('/trips', tripsController.createTrip);
app.get('/logout', usersController.logoutUser);

//connect to database
mongoose.connect('mongodb://localhost/hitcher');
process.on('exit', function(){ mongoose.disconnect(); });

//set views engine
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
hbs.registerPartials(__dirname + '/views/partials');
hbsutils.registerWatchedPartials(__dirname + '/views/partials');
app.use(express.static(__dirname + '/public'));

//start server
app.listen(port, function(){
  console.log('listening on port: ' + port);
});

module.exports = app;
