//jshint esversion:6
//   EJS - Lint; // EJS-Lint is a linter for EJS files. It is a Node.js module that can be used in your build process or as a CLI tool. It is a Node.js module that can be used in your build process or as a CLI tool.
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";
// Load the full build.
const _ = require('lodash');


const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));




var posts = [];

const randomId = () => {
    return Math.random().toString(36).substr(2, 9);
}

app.get("/", function(req, res) {

    res.render("home", { startingContent: homeStartingContent, posts: posts });

})

app.get("/about", function(req, res) {


        res.render("about", { aboutus: aboutContent })
    })
    // a function to render the contact page                
app.get("/contact", function(req, res) {

    res.render("contact", { contactus: contactContent })
});




//a function to render the compose page     

app.get("/compose", function(req, res) {

    res.render("compose");
})



//body parser to get the data from the compose page


app.post("/compose", function(req, res) {

        const post = {

                title: req.body.postTitle,
                content: req.body.postBody,
                id: randomId()
            }
            //console.log(req.body.postTitle);
        posts.push(post);

        res.redirect("/");
    })
    //a function to render the post page


app.get("/posts/:postId", function(req, res) {
    const postId = req.params.postId;
    posts.forEach(function(post) {
        if (post.id === postId) {
            res.render("post", { title: post.title, content: post.content });
        }
    })
})





app.listen(process.env.PORT || 8080, function() {
    console.log("Server started on port 3000");
});