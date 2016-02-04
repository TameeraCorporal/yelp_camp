var mongoose   = require("mongoose");
var Campground = require("./models/campground");
var Comment    = require("./models/comment");

var data = [
  {
    name: "Salmon Creek", 
    image: "https://farm1.staticflickr.com/742/21988196478_75cd1300b5.jpg",
    description: "Maybe he has a little friend that lives right over here. I thought today we would do a happy little picture. It's a very cold picture, I may have to go get my coat. It’s about to freeze me to death. You are only limited by your imagination. We'll put some happy little leaves here and there. Follow the lay of the land. It's most important."
  },
  {
      name: "Granite Hill", 
      image: "https://farm6.staticflickr.com/5774/21287793088_cd6894cea6.jpg",
      description:  "Maybe he has a little friend that lives right over here. I thought today we would do a happy little picture. It's a very cold picture, I may have to go get my coat. It’s about to freeze me to death. You are only limited by your imagination. We'll put some happy little leaves here and there. Follow the lay of the land. It's most important."
  },  
  {
      name: "Mountain Goat's Rest", 
      image: "https://farm8.staticflickr.com/7318/9117773093_2f287941c9.jpg",
      description:  "So many happy little trees! This is a great place to visit!"
      
  },
  {
      name: "Salmon Creek", 
      image: "https://farm1.staticflickr.com/742/21988196478_75cd1300b5.jpg",
      description:  "I'm sort of a softy, I couldn't shoot Bambi except with a camera. Poor old tree. Trees get lonely too, so we'll give him a little friend."
      
   },
  ];

function seedDB(){
  //Remove all campgrounds
  Campground.remove({}, function(err){
  if(err){
    console.log(err);
  }
  console.log("removed campgrounds!");
   //add a few campgrounds
  data.forEach(function(seed){
    Campground.create(seed, function(err, campground){
      if(err){
        console.log(err);
      }
      else{
        console.log("added a campground");
        //create a few comments
        Comment.create(
          {
            text:"Nice place, needs Wi-fi!",
            author: "Homer"
          }, 
          function(err, comment){
            if(err){
              console.log(err);
            }
            else{
              campground.comments.push(comment);
              campground.save();
              console.log("comment created!");
            }
              
          });
        }
      });
    });
   });

}

module.exports = seedDB;
