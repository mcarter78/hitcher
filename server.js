var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var hbs = require('hbs');
var hbsutils = require('hbs-utils')(hbs);
var port = process.env.PORT || 3000;

//middleware
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//controllers
var homeController = require('./controllers/homeController');
var usersController = require('./controllers/usersController');
var tripsController = require('./controllers/tripsController');


//routes
app.get('/', homeController.home);

app.get('/users/new', usersController.newUser);
app.post('/users', usersController.createUser);

app.get('/trips/new', tripsController.newTrip);
app.post('/trips', tripsController.createTrip);

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
