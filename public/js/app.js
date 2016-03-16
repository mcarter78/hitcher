$(document).ready(function(){
  console.log('app running');
  $('#home-form input').on('click', function(e){
    console.log('clicked');
    window.location.replace('http://localhost:3000/trips/new'); // TODO:  change URL when deploying
  });
  $('#logged-in-nav').hide();
  $('#logged-out-nav').hide();
  hitcher.renderNav();
});

var hitcher = {};

hitcher.createUser = function(e){
  e.preventDefault();
	var user = $(e.target).serialize();
  $.post('/users', user)
    .done(function(res){
    	console.log("user created", res);
      window.location.replace('http://localhost:3000/trips/new'); // TODO:  change URL when deploying
    });
}

hitcher.login = function(e){
  e.preventDefault();
  var user = $(e.target).serialize();
  $.post('/login', user)
    .done(function(res){
      console.log("user logged in", res);
      window.location.replace('http://localhost:3000/trips/new'); // TODO:  change URL when deploying
    });
}

hitcher.createTrip = function(e){
  e.preventDefault();
  var trip = $(e.target).serialize();
  console.log(trip);
  $.post('/trips', trip)
    .done(function(res){
      console.log("trip created");
      window.location.replace('http://localhost:3000/trips'); // TODO:  change URL when deploying
    });
}

hitcher.renderTrips = function(users){
  console.log(users);
  var $tripList = $("#trip-list");
  // clear list
  $tripList.html("");
  // create template
  var tripTemplate = Handlebars.compile($("#trip-template").html());
  // pass data into the template
  var compiledHtml = tripTemplate({users: users});
  // append the rendered html to the page
  $tripList.append(compiledHtml);
}

hitcher.showTrip = function(trips){
  console.log("hello!hello1");
  var $tripShow = $("#trip-show");
  $tripShow.html("");
  var tripShow = Handlebars.compile($("#show-trip").html());
  var compiledHtml = tripShow({trip: trips});
  console.log(compiledHtml);
  $tripShow.append(compiledHtml);
}

hitcher.renderNav = function(){
    $.get('/checkuser', function(user){
      console.log(user);
      if (user === "") {
        console.log('no user');
        //show logged out version of nav
        $('#logged-in-nav').hide();
        $('#logged-out-nav').show();
      }
      else {
        console.log('user present');
        //show logged in version of nav
        $('#logged-out-nav').hide();
        $('#logged-in-nav').show();
      }
    });
}
