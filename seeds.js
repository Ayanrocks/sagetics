var mongoose = require('mongoose'),
campground = require('./models/campground');
var comment = require("./models/comment");
var data = [
  {
    name: "Clouds rest spot",
    image: "https://images.pexels.com/photos/378278/pexels-photo-378278.jpeg?h=350&auto=compress&cs=tinysrgb",
    description:"This is the horizontal view of santa maria beach clouds settling"
  },
  {
    name: "In the woods",
    image: "https://images.pexels.com/photos/556963/pexels-photo-556963.jpeg?h=350&auto=compress&cs=tinysrgb",
    description:"This is the havana rainforest campground. The sunrise view from this place is astonishing"
  },
  {
    name: "Yellow garden",
    image: "https://images.pexels.com/photos/383640/pexels-photo-383640.jpeg?h=350&auto=compress&cs=tinysrgb",
    description:"The sun at yellow garden is so happy that it will make you forget your sad days"
  },
  {
    name: "Rainforest dominica",
    image: "https://images.pexels.com/photos/397219/pexels-photo-397219.jpeg?h=350&auto=compress&cs=tinysrgb",
    description:"Rainforest dominica is no wonder the wonder of the world. The calm nature of this place will make you stay forever"
  }
]
function seeddb(){
  //remove all campground
  campground.remove({}, function(err){
    if(err){
      console.log(err);
    }
    else {
      console.log("campgrounds removed");
    }
  });
  //add few campgrounds
  data.forEach(function(seed){
    campground.create(seed, function(err, data){
      if(err)
      {
        console.log(err);
      }
      else {
        console.log("Campgrounds added");
        //create a comment
        comment.create({
          text: "This place is great but no internet :(",
          author: "Henry"
        }, function(err,comment){
          if(err){
            console.log(err);
          }
          else {
          data.comments.push(comment);
          data.save();
          console.log("new comment created");
        }});
      }
    });
  });
}
module.exports = seeddb;
