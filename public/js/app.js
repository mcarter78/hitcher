console.log('app running');

function createUser(e){
  e.preventDefault();
	var user = $(e.target).serialize();
  $.post('/users', user)
    .done(function(res){
    	console.log("user created", res);
      window.location.replace('http://localhost:3000/trips/new'); // TODO:  change URL when deploying
    });
}

function login(e){
  e.preventDefault();
  var user = $(e.target).serialize();
  $.post('/login', user)
    .done(function(res){
      console.log("user logged in", res);
      window.location.replace('http://localhost:3000/trips/new'); // TODO:  change URL when deploying
    });
}

function createTrip(e){
  e.preventDefault();
  var trip = $(e.target).serialize();
  console.log(trip);
  $.post('/trips', trip)
    .done(function(res){
      console.log("trip created", res);
    });
}

$('#home-form input').on('click', function(e){
  console.log('clicked');
  window.location.replace('http://localhost:3000/trips/new'); // TODO:  change URL when deploying
});
