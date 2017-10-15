var express = require("express");
var router = express.Router();
var campground = require("../models/campground");
var middleware = require("../middleware");


//INDEX routes

router.get("/", function (req, res) {
    campground.find({}, function (err, allcampground) {
        if (err) {
            console.log("err" + err);
        } else {
            res.render("campgrounds/index", {
                campgrounds: allcampground,
                currentuser: req.user
            });
        }
    });
});

//create routes

router.post("/", middleware.isloggedin, function (req, res) { 
    // get data from for and add to campground array
    var name = req.body.name;
    var price = req.body.price;
    var image = req.body.image;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var desc = req.body.description;
    var newcampground = {
        name: name,
        price:price,
        image: image,
        description: desc,
        author: author
    };


    //   campgrounds.push(newcampground);
    campground.create(newcampground, function (err, newly) {
        if (err) {
            console.log("err " + err);
        } else {
            res.redirect("/campgrounds");
        }
    });
    //redirect back to get route

});

router.get("/new", middleware.isloggedin, function (req, res) { //new routes
    res.render("campgrounds/new");
});

router.get("/:id", function (req, res) { //show routes
    campground.findById(req.params.id).populate("comments").exec(function (err, foundcampground) {
        if (err) {
            console.log(err);
        } else {
            console.log(foundcampground);
            res.render("campgrounds/show", {
                campground: foundcampground
            });
        }
    });


});

//EDIT ROUTE

router.get("/:id/edit", middleware.checkcampgroundownership , function (req, res) {
            //    is user logged in
            campground.findById(req.params.id, function (err, foundcampground) {

                res.render("campgrounds/edit", {
                    campground: foundcampground
                });
            });
});

            //UPDATE ROUTE

            router.put("/:id", middleware.checkcampgroundownership , function (req, res) {

                //find and update the current campground
                campground.findByIdAndUpdate(req.params.id, req.body.campground, function (err, updatedcampground) {
                    if (err) {
                          req.flash("error", "Something went wrog");
                        res.redirect("/campground");
                    } else {
                        
                        res.redirect("/campgrounds/" + req.params.id);
                    }
                });
            });

            //DESTROY ROUTE

            router.delete("/:id", middleware.checkcampgroundownership , function (req, res) {
                campground.findByIdAndRemove(req.params.id, function (err) {
                    if (err) {
                        res.redirect("/campgrounds");
                    } else {
                          req.flash("success", "Campground deleted");
                        res.redirect("/campgrounds");
                    }
                })
            });

            
            

            module.exports = router;
