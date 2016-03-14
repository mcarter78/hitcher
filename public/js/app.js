console.log('app running');
		function createUser(e){
		console.log("called!");
	  e.preventDefault();
		var user = $(e.target).serialize();
	  $.post('/users', user)
	    .done(function(res){
	    	console.log("user created", res);
	    });
	}

	



// $(document).ready(function(){
// });
