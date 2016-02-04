
var middlewareObj = {},
    Campground  =   require("../models/campground"),
    Comment     =   require("../models/comment");

//Ownership validation
middlewareObj.checkCampgroundOwnership = function(req, res, next){
   if(req.isAuthenticated()){
       
     Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            req.flash("error", "Campground not found");
            res.redirect("back");
        }
        else{
             //does user own the campground?
             if(foundCampground.author.id.equals(req.user._id)){
               next();
             
             }
             else{
                 req.flash("error", "You don't have permission to do that");
                 res.redirect("back");
             }
        }
      });   
    }
    
    else{
        req.flash("error", "You need to be logged in to do that");
        res.redirect("back");
    }
  
    
}

 //Ownership validation
middlewareObj.checkCommentOwnership = function(req, res, next){
 
    if(req.isAuthenticated()){
       
     Comment.findById(req.params.comment_id, function(err, foundComment){
        if(err){
            req.flash("error", "You need to be logged in to do that");
            res.redirect("back");
        }
        else{
             //does user own the campground?
             if(foundComment.author.id.equals(req.user._id)){
               next();
             
             }
             else{
                 req.flash("You don't have permission to do that");
                 res.redirect("back");
             }
        }
      });   
    }
    
    else{
        console.log("You need to be logged in to do that!!");
        res.redirect("back");
    }

}

//Login validation
middlewareObj.isLoggedIn = function(req, res, next){
  
    if(req.isAuthenticated()){
      
      return next();
    }
    req.flash("error", "You need to be logged in to do that");
    res.redirect("/login");
    
}

module.exports = middlewareObj;