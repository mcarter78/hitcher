
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/hitcher');
var User = require('../models/user');

var zipCodes = [94133, 94129, 94123, 94111, 94121, 94118, 94115, 94109, 94108,
                94104, 94105, 94131, 94132, 94122, 94117, 94102, 94103, 94158,
                94116, 94114, 94110, 94107, 94127, 94124, 94112, 94134];

var fake_users = [

  {
    email: "JoeFlan242@gmail.com",
    name: "JoeFan",
    passwordDigest: "Password",
    imageUrl:"http://pickaface.net/includes/themes/clean/img/slide2.png",
    mobileNumber: "876-567-8987"
  },

  {
    email: "Ilovegreenham@yahoo.com",
  name: "Samiam",
  passwordDigest: "Password",
   imageUrl:"http://img-cache.cdn.gaiaonline.com/0985e09aba93aaa67cc112317b77b2a7/http://i556.photobucket.com/albums/ss4/chanhw1/rilakkuma.jpg",
   mobileNumber: "880-221-4321"
 },

  {
    email: "TheoneRing@hotmail.com",
  name: "Frodo Baggins",
  passwordDigest: "Password",
  imageUrl:"http://media.tumblr.com/b46b18d9015cc5c7069fc79aa0a685ff/tumblr_inline_mlcuxtvsm11qai3ch.jpg",
  mobileNumber: "572-123-2312"
},

   {
    email: "hogwarth@gmail.com",
   name: "Harry James",
   passwordDigest: "Password",
   imageUrl:"http://www.footballmanagernow.co.uk/core/avatars/0/0/1/0/7/5//avatar241_2.jpeg",
   mobileNumber: "213-123-5123"
 },

  {
    email: "ChiliFriesfordays@hotmail.com",
  name: "GreenBeard",
  passwordDigest: "Password",
  imageUrl:"https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/9b/9b741376bfb703bc19265c1acf6acae2ddc13b35_full.jpg",
  mobileNumber: "099-643-5123"
},

   {
    email: "JJfood@lillyman.com",
   name: "JamesJR",
   passwordDigest: "Password",
   imageUrl:"https://lh6.googleusercontent.com/-b4eZ76EdnXQ/AAAAAAAAAAI/AAAAAAAAABs/thOic01qRYg/photo.jpg",
   mobileNumber: "821-129-1231"
 },

  {
    email: "Gilgnome@ham.com",
  name: "Ben Fran",
  passwordDigest: "Password",
  imageUrl:"http://zeldauniverse.net/forums/wcf/images/avatars/65/17656-65581790c531172468ebbe055044562a3306d5f4.jpg",
  mobileNumber: "909-212-4541"
},

   {
    email: "Greatfood12@food.com",
   name: "Noman",
   passwordDigest: "Password",
   imageUrl:"http://ih1.redbubble.net/image.13475983.1212/fc,220x200,forest.jpg",
   mobileNumber: "990-123-1144"
 },

  {
    email: "WalterWhite@money.com",
  name: "Mr.Heisenberg",
  passwordDigest: "Password",
  imageUrl:"http://36.media.tumblr.com/7f9b3c30d0ce1e2189ae96b5126cee57/tumblr_n0e8ylfX421rpwm80o1_250.jpg",
  mobileNumber: "444-113-2322"
},

   {
    email: "TronMan@Tron.com",
   name: "Jimmy Tron",
   passwordDigest: "Password",
   imageUrl:"http://img-cache.cdn.gaiaonline.com/0bd5469725a2fb13e2791b2396e5f5f2/http://i523.photobucket.com/albums/w353/generationkill_2008/thumbs-up.jpg",
   mobileNumber: "656-332-5454"
 },

  {
    email: "ColbySalad@salad.com",
  name: "Ram Grand",
  passwordDigest: "Password",
  imageUrl:"http://cdn.photonesta.com/images/i51.tinypic.com/1zwzpmr.png",
  mobileNumber: "767-212-8898"
  }
];

addTrips(fake_users);

User.remove({}, function(err){
  if (err) return console.log(err);
  User.create(fake_users, function(err, users){
    if (err) return console.log(err);
    console.log("created", fake_users.length, "users");
    mongoose.connection.close();
  });

});

function addTrips(users){
  for(var i = 0; i < users.length; i++){
    var fromLoc = randomZip();
    var toLoc = randomZip();
    var userNum = randomNum();
    users[i]._id = i.toString();
    users[i].trips = [];
    if (userNum === 1) {
      users[i].trips.push({fromLocation: zipCodes[fromLoc], toLocation: zipCodes[toLoc], riderId: users[i]._id});
    } else {
      users[i].trips.push({fromLocation: zipCodes[fromLoc], toLocation: zipCodes[toLoc], driverId: users[i]._id});
    }
  }
}

function randomZip(){
  // pick a random number between 0 and 25
  return Math.floor(Math.random() * (25 - 0));
}

function randomNum(){
  return Math.ceil(Math.random() * (2 - 0));
}
