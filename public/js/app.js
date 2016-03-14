console.log('app running');

function createUser(e){
  e.preventDefault();
	var user = $(e.target).serialize();
  $.post('/users', user)
    .done(function(res){
    	console.log("user created", res);
    });
}







// $(document).ready(function(){
// });
