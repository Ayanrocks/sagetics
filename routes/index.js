var express = require("express");
var router = express.Router(),
    passport = require("passport"),
    user = require("../models/user");


    router.get("/", function (req, res) {
        res.render("landing");
        // body...
    });



//========================
//AUTH ROUTES
//=======================

//show register form
router.get("/register", function (req, res) {
    res.render("register");
});

//Handle a sign up logic
router.post("/register", function (req, res) {
    var newUser = new user({
        username: req.body.username
    });
    //   res.send("signing up...");
    user.register(newUser, req.body.password, function (err, user) {
        if (err) {
              req.flash("error", err.message);
//            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function () {
              req.flash("success", "Registered successfully " + user.username);
            res.redirect("/campgrounds");
        });

    });
});

//========================
//Show LOGIN FORM
//=======================

router.get("/login", function (req, res) {
    res.render("login");
});

//handling login logic

router.post("/login", passport.authenticate("local",

    {
        successRedirect: "/campgrounds",
        failureRedirect: "/login"
    }), function (req, res) {

});

//LOGOUT ROUTE
router.get("/logout", function (req, res) {
    req.logout();
    req.flash("success", "Logged you out!")
    res.redirect("/campgrounds");
});


module.exports = router;
