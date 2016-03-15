
var db = require("./models");

var fake_users =[
  {email: "JoeFlan242@gmail.com", name: "JoeFan", password: "Password", ImageUrl:"http://pickaface.net/includes/themes/clean/img/slide2.png", mobileNumber: "876-567-8987"},
  {email: "Ilovegreenham@yahoo.com", name: "Samiam", password: "Password", ImageUrl:"http://img-cache.cdn.gaiaonline.com/0985e09aba93aaa67cc112317b77b2a7/http://i556.photobucket.com/albums/ss4/chanhw1/rilakkuma.jpg", mobileNumber: "880-221-4321" },
  {email: "TheoneRing@hotmail.com", name: "Frodo Baggins", password: "Password", ImageUrl:"http://media.tumblr.com/b46b18d9015cc5c7069fc79aa0a685ff/tumblr_inline_mlcuxtvsm11qai3ch.jpg", mobileNumber: "572-123-2312"},
   {email: "hogwarth@gmail.com", name: "Harry James", password: "Password", ImageUrl:"http://www.footballmanagernow.co.uk/core/avatars/0/0/1/0/7/5//avatar241_2.jpeg", mobileNumber: "213-123-5123"},
  {email: "ChiliFriesfordays@hotmail.com", name: "GreenBeard", password: "Password", ImageUrl:"https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/9b/9b741376bfb703bc19265c1acf6acae2ddc13b35_full.jpg", mobileNumber: "099-643-5123" },
   {email: "JJfood@lillyman.com", name: "JamesJR", password: "Password", ImageUrl:"https://lh6.googleusercontent.com/-b4eZ76EdnXQ/AAAAAAAAAAI/AAAAAAAAABs/thOic01qRYg/photo.jpg", mobileNumber: "821-129-1231"},
  {email: "Gilgnome@ham.com", name: "Ben Fran", password: "Password", ImageUrl:"http://zeldauniverse.net/forums/wcf/images/avatars/65/17656-65581790c531172468ebbe055044562a3306d5f4.jpg", mobileNumber: "909-212-4541" },
   {email: "Greatfood12@food.com", name: "Noman", password: "Password", ImageUrl:"http://ih1.redbubble.net/image.13475983.1212/fc,220x200,forest.jpg", mobileNumber: "990-123-1144"},
  {email: "WalterWhite@money.com", name: "Mr.Heisenberg", password: "Password", ImageUrl:"http://36.media.tumblr.com/7f9b3c30d0ce1e2189ae96b5126cee57/tumblr_n0e8ylfX421rpwm80o1_250.jpg", mobileNumber: "444-113-2322" },
   {email: "TronMan@Tron.com", name: "Jimmy Tron", password: "Password", ImageUrl:"http://img-cache.cdn.gaiaonline.com/0bd5469725a2fb13e2791b2396e5f5f2/http://i523.photobucket.com/albums/w353/generationkill_2008/thumbs-up.jpg", mobileNumber: "656-332-5454"},
  {email: "ColbySalad@salad.com", name: "Ram Grand", password: "Password", ImageUrl:"http://cdn.photonesta.com/images/i51.tinypic.com/1zwzpmr.png", mobileNumber: "767-212-8898" },
];

db.fake_users.remove({}, function(err, fake_users){

  db.fake_users.create(fake_users, function(err, fake_users){
    if (err) { return console.log(err) }
    console.log("created", foods.length, "users");
    process.exit();
  });

});