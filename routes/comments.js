var express = require("express");
var router = express.Router({
    mergeParams: true
});

var campground = require("../models/campground");
var comment = require("../models/comment");
var middleware = require("../middleware");


//=====================
// Comments routes
//=====================

//NESTED NEW ROUTES
router.get("/new", middleware.isloggedin, function (req, res) {
    //find campground by id
    campground.findById(req.params.id, function (err, campground) {
        if (err) {
            console.log(err);
        } else {
            res.render("comments/new", {
                campground: campground
            });

        }
    })
});

//NESTED CREATE ROUTES
router.post("/", middleware.isloggedin, function (req, res) {
    //lookup campground using id
    campground.findById(req.params.id, function (err, campground) {
        if (err) {
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            //create new comment
            comment.create(req.body.comment, function (err, comment) {
                if (err) {
                      req.flash("error", "Something went wrong");
                    console.log(err);
                } else {
                    //add username and id to connect
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    //save comment
                    comment.save();
                    //connect new comment to campground
                    campground.comments.push(comment);
                    campground.save();
                      req.flash("success", "Comment added successfully");
                    //redirect to show page
                    res.redirect('/campgrounds/' + campground._id);
                }
            })


        }

    });

});

//EDIT ROUTE
router.get("/:comment_id/edit", middleware.checkcommentownership, function (req, res) {
    comment.findById(req.params.comment_id, function (err, foundcomment) {
        if (err) {
            res.redirect("back");
        } else {
            res.render("comments/edit", {
                campground_id: req.params.id,
                comment: foundcomment
            });
        }
    });
});

//UPDATE ROUTE
router.put("/:comment_id", middleware.checkcommentownership, function(req,res) {
   comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedcomment){
       if(err){
           res.redirect("back");
       }
       else {
           res.redirect("/campgrounds/" + req.params.id);
       }
   }) 
});

//DELETE ROUTE

router.delete("/:comment_id", middleware.checkcommentownership, function(req, res){
   comment.findByIdAndRemove(req.params.comment_id, function(err){
       if(err) {
           res.redirect("back");
       }
       else {
             req.flash("success", "Comment deleted");
           res.redirect("/campgrounds/" +req.params.id );
       }
   }); 
});




module.exports = router
