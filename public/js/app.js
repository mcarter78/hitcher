console.log('app running');


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
  var compliledHtml = tripTemplate({users: users});
  // append the rendered html to the page
  $tripList.append(compliledHtml);
}

$('#home-form input').on('click', function(e){
  console.log('clicked');
  var userId = 'testId';
  window.location.replace('http://localhost:3000/trips/new'); // TODO:  change URL when deploying
});
