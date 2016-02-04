var  express    = require("express"), 
     router     = express.Router(),
     Campground = require("../models/campground"),
     middleware = require("../middleware");

//remember, you don't have to use /campgrounds because you defined the campgrounds route in the app.js file

//show all campgrounds
router.get("/", function(req, res){
  Campground.find({}, function(err, allCampgrounds){
   if(err){
     console.log(err);
   }
   
   else{
     res.render("campgrounds/index", {campgrounds: allCampgrounds});
   }
 });
}); 

//create new campground
router.get("/new", middleware.isLoggedIn, function(req, res){
  res.render("campgrounds/new");
});

router.post("/", middleware.isLoggedIn, function(req, res){
  var name= req.body.name;
  var image = req.body.image;
  var desc = req.body.description;
   var author = {
      id: req.user._id,
      username: req.user.username
  };
  var newCampground = {name: name, image: image, description: desc, author:author
      
  };
 
  console.log(req.user);
  Campground.create(newCampground, function(err, newlyCreated){
    if(err){
      console.log(err);
    }
    
    else{
       console.log(newlyCreated);
       res.redirect("/campgrounds");
    }
  });
 
});

//shows more info about one campground
router.get("/:id", function(req, res){
  Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
   if(err){
     console.log(err);
   } 
   
   else{
     console.log(foundCampground); 
     res.render("campgrounds/show", {campground: foundCampground});
   }
  });
  
});

//edit campground route
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res){
    //is user logged in?
    Campground.findById(req.params.id, function(err, foundCampground){
        res.render("campgrounds/edit", {campground: foundCampground});  
       
      });   

});

//update campground route
router.put("/:id", function(req, res){
    //find and update the campground
    
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
        if(err){
            res.redirect("/campgrounds");
        }
         //redirect to show page
        else{
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
   
});

//destroy campground route
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/campgrounds");
        }
        else{
            res.redirect("/campgrounds");
        }
    });
});





module.exports = router;