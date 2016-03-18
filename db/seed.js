
var mongoose = require('mongoose');
mongoose.connect('mongodb://whispering-anchorage-42141.herokuapp.com/hitcher');
var User = require('../models/user');

var zipCodes = [94133, 94129, 94123, 94111, 94121, 94118, 94115, 94109, 94108,
                94104, 94105, 94131, 94132, 94122, 94117, 94102, 94103, 94158,
                94116, 94114, 94110, 94107, 94127, 94124, 94112, 94134];

var fake_users = [

  {
    email: "JoeFlan242@gmail.com",
    name: "JoeFan",
    password: "Password",
    ImageUrl:"http://pickaface.net/includes/themes/clean/img/slide2.png",
    mobileNumber: "876-567-8987"

  },
  {
    email: "Ilovegreenham@yahoo.com",
    name: "Samiam",
    password: "Password",
    ImageUrl:"http://img-cache.cdn.gaiaonline.com/0985e09aba93aaa67cc112317b77b2a7/http://i556.photobucket.com/albums/ss4/chanhw1/rilakkuma.jpg",
    mobileNumber: "880-221-4321"
  },
  {
    email: "TheoneRing@hotmail.com",
    name: "Frodo Baggins",
    password: "Password",
    ImageUrl:"http://media.tumblr.com/b46b18d9015cc5c7069fc79aa0a685ff/tumblr_inline_mlcuxtvsm11qai3ch.jpg",
    mobileNumber: "572-123-2312"
  },
  {
    email: "hogwarth@gmail.com",
    name: "Harry James",
    password: "Password",
    ImageUrl:"http://www.footballmanagernow.co.uk/core/avatars/0/0/1/0/7/5//avatar241_2.jpeg",
    mobileNumber: "213-123-5123"
  },
  {
    email: "ChiliFriesfordays@hotmail.com",
    name: "GreenBeard",
    password: "Password",
    ImageUrl:"https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/9b/9b741376bfb703bc19265c1acf6acae2ddc13b35_full.jpg",
    mobileNumber: "099-643-5123"
  },
  {
    email: "JJfood@lillyman.com",
    name: "JamesJR",
    password: "Password",
    ImageUrl:"https://lh6.googleusercontent.com/-b4eZ76EdnXQ/AAAAAAAAAAI/AAAAAAAAABs/thOic01qRYg/photo.jpg",
    mobileNumber: "821-129-1231"
  },
  {
    email: "Gilgnome@ham.com",
    name: "Ben Fran",
    password: "Password",
    ImageUrl:"http://zeldauniverse.net/forums/wcf/images/avatars/65/17656-65581790c531172468ebbe055044562a3306d5f4.jpg",
    mobileNumber: "909-212-4541"
  },
  {
    email: "Greatfood12@food.com",
    name: "Noman",
    password: "Password",
    ImageUrl:"http://ih1.redbubble.net/image.13475983.1212/fc,220x200,forest.jpg",
    mobileNumber: "990-123-1144"},
  {
    email: "WalterWhite@money.com",
    name: "Mr.Heisenberg",
    password: "Password",
    ImageUrl:"http://36.media.tumblr.com/7f9b3c30d0ce1e2189ae96b5126cee57/tumblr_n0e8ylfX421rpwm80o1_250.jpg",
    mobileNumber: "444-113-2322" },
  {
    email: "TronMan@Tron.com",
    name: "Jimmy Tron",
    password: "Password",
    ImageUrl:"http://img-cache.cdn.gaiaonline.com/0bd5469725a2fb13e2791b2396e5f5f2/http://i523.photobucket.com/albums/w353/generationkill_2008/thumbs-up.jpg",
    mobileNumber: "656-332-5454"
  },
  {
    email: "ColbySalad@salad.com",
    name: "Ram Grand",
    password: "Password",
    ImageUrl:"http://cdn.photonesta.com/images/i51.tinypic.com/1zwzpmr.png",
    mobileNumber: "767-212-8898"
  },
  {
    email: "HamMan@jam.com",
    name: "Ron Geary",
    passwordDigest: "Password",
    imageUrl:"https://pbs.twimg.com/media/CIWUgk_UwAAzM1V.png",
    mobileNumber: "421-645-9012"
  },
  {  email: "YellowBrickroad@ghoul.com",
    name: "Rolly Polly",
    passwordDigest: "Password",
  imageUrl:"http://pre14.deviantart.net/f760/th/pre/i/2014/307/2/6/my_new_steam_avatar_by_some_dude2-d85614s.png",
    mobileNumber: "767-212-8898"
  },

   { email: "Iwastheturkey@invade.com",
    name: "Gir",
    passwordDigest: "Password",
    imageUrl:"http://www.sc2mapster.com/media/avatars/7/848/gir4steam.jpg",
    mobileNumber: "889-444-1212"
  },
  {
    email: "LambCake@jam.com",
    name: "Larry Pod",
    passwordDigest: "Password",
   imageUrl:"http://orig09.deviantart.net/df05/f/2016/038/0/1/avatar_steam_for_perfectionvore___by_realwhounz_by_realwhounz-d9qxozc.png",
    mobileNumber: "544-1221-7519"
  },
  {
    email: "Zaal@trop.com",
    name: "Zaall Yom",
    passwordDigest: "Password",
   imageUrl:"http://orig15.deviantart.net/81e4/f/2014/331/8/a/steam_avatar__s_i_a_s_by_neidii-d6nnhwv.jpg",
    mobileNumber: "512-889-2765"
  },
  {
    email: "Fishyman@golly.com",
    name: "Tommy Fun",
    passwordDigest: "Password",
    imageUrl:"http://elitearmy.eu/forumz/uploads/avatars/avatar_27.jpg?dateline=1376785230",
    mobileNumber: "111-214-5890"
  },
  {
    email: "UsetheSchwartz@space.com",
    name: "John Bullook",
    passwordDigest: "Password",
    imageUrl:"https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/16/16a6669bdb539a7df9bde590993329c7d830f0e0_full.jpg",
    mobileNumber: "531-998-5712"
  },
  {
   email: "ColbySalad@salad.com",
    name: "Ram Grand",
    passwordDigest: "Password",
    imageUrl:"http://cdn.photonesta.com/images/i51.tinypic.com/1zwzpmr.png",
    mobileNumber: "767-212-8898"
  },
  {
    email: "Hollow@food.com",
    name: "Sarah Bann",
    passwordDigest: "Password",
    imageUrl:"http://d3tagfjj1pibwj.cloudfront.net/wp-content/uploads/profile_builder/avatars/userID_482_originalAvatar_ninja-200x200.jpg",
    mobileNumber: "113-878-8871"
  },
  {
    email: "Toonland@Lamb.com",
    name: "Bob Lumber",
    passwordDigest: "Password",
    imageUrl:"https://forums.uberent.com/data/avatars/l/1802/1802413.jpg?1394493521",
    mobileNumber: "140-1246-9012"
  },
  {
    email: "ColbySalad@salad.com",
    name: "Ram Grand",
    passwordDigest: "Password",
    imageUrl:"http://cdn.photonesta.com/images/i51.tinypic.com/1zwzpmr.png",
    mobileNumber: "767-212-8898"
  },
  {
    email: "ColbySalad@salad.com",
    name: "Ram Grand",
    passwordDigest: "Password",
    imageUrl:"http://cdn.photonesta.com/images/i51.tinypic.com/1zwzpmr.png",
    mobileNumber: "767-212-8898"
  },
  {
    email: "TombFall@River.com",
    name: "Monday Goal",
    passwordDigest: "Password",
    imageUrl:"http://i.imgur.com/nKBoVWG.png",
    mobileNumber: "512-612-462"
  },
  {
    email: "Hobosh@go.com",
    name: "nolland Other",
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
