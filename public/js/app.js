console.log('app running');

function createUser(e){
  e.preventDefault();
	var user = $(e.target).serialize();
  $.post('/users', user)
    .done(function(res){
    	console.log("user created", res);
    });
}

function login(e){
  e.preventDefault(); 
  var user = $(e.target).serialize();
  $.post('/login', user)
    .done(function(res){
      console.log("user logged in", res);
    });
}







// $(document).ready(function(){
// });
