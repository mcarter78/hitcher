var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var hbs = require('hbs');
var hbsutils = require('hbs-utils')(hbs);
var port = process.env.PORT || 3000;

//connect to database
mongoose.connect('mongodb://localhost/hitcher');
process.on('exit', function(){ mongoose.disconnect(); });

//set views engine
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');
hbsutils.registerWatchedPartials(__dirname + '/views/partials');
app.use(express.static(__dirname + '/public'));

//middleware
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//start server
app.listen(port, function(){
  console.log('listening on port: ' + port);
});

module.exports = app;
