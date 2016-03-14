console.log('app running');

function createUser(e){
  e.preventDefault();
	var user = $(e.target).serialize();
  $.post('/users', user)
    .done(function(res){
    	console.log("user created", res);
    });
}

function createTrip(e){
  e.preventDefault();
  var trip = $(e.target).serialize();
  $.post('/trips', trip)
    .done(function(res){
      console.log("trip created", res);
    });
}

$('#home-form').on('click', function(){
  $.get('/trips/new');
});








// $(document).ready(function(){
// });
