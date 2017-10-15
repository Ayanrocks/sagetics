var express = require("express"),
    app = express(),
    bodyparser = require("body-parser"),
    mongoose = require("mongoose"),
    campground = require("./models/campground"),
    methodoverride = require("method-override"),
    flash = require("connect-flash"),
    passport = require("passport"),
    localstrategy = require("passport-local"),
    user = require("./models/user"),
    comment = require("./models/comment"),
    seeddb = require('./seeds');

var commentroutes = require("./routes/comments"),
    campgroundroutes = require("./routes/campgrounds"),
    indexroutes = require("./routes/index");

//seed the database
//seeddb();
mongoose.connect("mongodb://localhost/yelpcamp", {
    useMongoClient: true
});

app.use(bodyparser.urlencoded({
    extended: true
}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodoverride("_method"));
app.use(flash());
//PASSPORT SETUP
app.use(require("express-session")({
    secret: "Ayan",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localstrategy(user.authenticate()));
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());

app.use(function (req, res, next) {
    res.locals.currentuser = req.user;
     res.locals.error = req.flash("error");
     res.locals.success = req.flash("success");
    next();
});


// campground.create({
//     name: "salmon creek", image:"https://media.mnn.com/assets/images/2015/09/tents-at-night-3.jpg.838x0_q80.jpg",
//     description: "This is the view of salmon creek mountain "

// }

// , function(err,campgrounds)
// {
//     if(err){
//         console.log("err" +err);
//     }
//     else {
//         console.log("added to db" + campgrounds);
//     }
// });

// var campgrounds = [
//         {name: "salmon creek", image:"https://media.mnn.com/assets/images/2015/09/tents-at-night-3.jpg.838x0_q80.jpg"},
//         {name: "granite hill", image:"https://www.outdoorsy.co.nz/wp-content/uploads/2015/10/motutara4.jpg"},
//         {name: "puri", image:"https://upload.wikimedia.org/wikipedia/commons/c/c4/Bhandak_Thaatch-_Camping_I_IMG_7385.jpg"}
//         ];


app.use("/",indexroutes);
app.use("/campgrounds", campgroundroutes);
app.use("/campgrounds/:id/comments", commentroutes);


//====================
//Listening port
//====================

app.listen(80,process.env.IP, function () {
    console.log("YelpCamp server running");
});
