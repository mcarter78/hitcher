$(document).ready(function(){
  console.log('app running');
});

var hitcher = {};

hitcher.createUser = function(e){
  e.preventDefault();
  $.post('/users', user)
    .done(function(){
      //do something
    });
};
