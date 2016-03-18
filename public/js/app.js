$(document).ready(function(){
  // on click of the dummy form
  $('#home-form input').on('click', function(e){
    // redirect to create a trip
    window.location.replace('http://localhost:3000/trips/new'); // TODO:  change URL when deploying
  });
  // hide both navs on page load
  $('#logged-in-nav').hide();
  $('#logged-out-nav').hide();
  // render the appropriate nav
  hitcher.renderNav();
});

var hitcher = {};

hitcher.createUser = function(e){
  e.preventDefault();
  // collect the new user form data
	var user = $(e.target).serialize();
  $.post('/users', user)
    .done(function(res){
      // redirect to create a trip
      window.location.replace('http://localhost:3000/trips/new'); // TODO:  change URL when deploying
    });
};

hitcher.login = function(e){
  e.preventDefault();
  // collect the login form data
  var user = $(e.target).serialize();
  $.post('/login', user)
    .done(function(res){
      // redirect to create a trip
      window.location.replace('http://localhost:3000/trips/new'); // TODO:  change URL when deploying
    });
};

hitcher.createTrip = function(e){
  e.preventDefault();
  // collect the new trip form data
  var trip = $(e.target).serialize();
  $.post('/trips', trip)
    .done(function(res){
      // redirect to trips index
      window.location.replace('http://localhost:3000/trips'); // TODO:  change URL when deploying
    });
};

hitcher.renderTrips = function(user){
  var $tripList = $("#trip-list");
  // clear list
  $tripList.html("");
  // create template
  var tripTemplate = Handlebars.compile($("#trip-template").html());
  // pass data into the template
  var compiledHtml = tripTemplate({users: user, trips: user.trips});
  // append the rendered html to the page
  $tripList.append(compiledHtml);
};

hitcher.loggedIn = function(currentUser){
  var $currentUser = $("#current-user");
  // clear list
  $currentUser.html("");
  // create template
  var userTemplate = Handlebars.compile($("#user-template").html());
  // pass data into the template
  var compiledHtml = userTemplate({profile: currentUser});
  // append the rendered html to the page
  $currentUser.append(compiledHtml);
  // if the trip does not currently have a rider
  if(currentUser.trips[0].riderId === undefined) {
    // hide the rider version of the index
    $("#rider-message").hide();
  } else {
    // hide the driver version of the index, show the rider version
    $("#trip-list").hide();
    $("#rider-message").show();
    // every 10 seconds...
    setInterval(function(){
      // run a check to see if rider has been selected for pick up
      hitcher.checkForDriver(currentUser);
      // if not, reload the page
      window.location.reload();
    }, 10000);
  }
};

hitcher.checkForDriver = function(driver){
  $.get('/drivercheck', driver)
    .done(function(res){
      // if response does not come back empty
      if(res !== ''){
        // redirect to show page (res will come back with a trip id)
        window.location.replace('http://localhost:3000/trips/' + res); // TODO:  change URL when deploying
      }
    });
};

hitcher.showTrip = function(trips, rider, driver){
  var $tripShow = $("#trip-show");
  // clear list
  $tripShow.html("");
  // create template
  var tripShow = Handlebars.compile($("#show-trip").html());
  // pass data into the template
  var compiledHtml = tripShow({trips: trips, rider: rider, driver: driver});
  // append the rendered html to the page
  $tripShow.append(compiledHtml);
};

// hitcher.tripNav = function() {
//   if (driver id === undefined || rider id === undefined) {
//     $('#matched-nav').hide();
//     $('#not-matched-nav').show();
//   }
//   else {
//     $('#not-matched-nav').hide();
//     $('#matched-nav').show();
//   };
// }

hitcher.deleteTrip = function(){
  // get trip's id from the view
  var tripId = $(".trip.trip-card").attr("id");
  $.ajax({
    method: 'DELETE',
    url: "/trips/" + tripId
  });
};

hitcher.updateTrip = function(e){
  e.preventDefault();
  // collect edit form data
  var trip = $(e.target).serialize();
  // get trip's id from the view
  var tripId = $(".trip.trip-card").attr("id");
  $.ajax({
    method: 'PUT',
    url: "/trips/" + tripId,
    data: trip,
    success: function (data) {
      // redirect back to the trip's show page
      window.location.replace('http://localhost:3000/trips/' + tripId); // TODO:  change URL when deploying
    }
  });
};

hitcher.renderNav = function(){
  // sends request to check if user is logged in
  $.get('/checkuser', function(user){
    // if empty response is sent back
    if (user === "") {
      //show logged out version of nav
      $('#logged-in-nav').hide();
      $('#logged-out-nav').show();
    }
    else {
      //show logged in version of nav
      $('#logged-out-nav').hide();
      $('#logged-in-nav').show();
    }
  });
};
