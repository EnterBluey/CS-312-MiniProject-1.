const express = require("express");
const bodyParser = require("body-parser");
const app = express();

// EJS setup with the main sub folder
app.set("view engine", "ejs");
app.set("views", __dirname + "/main");

// calls to CSS folder to pull the style.css for the website
app.use(express.static("CSS"));

// parse from data
app.use(bodyParser.urlencoded({ extended: true }));

// storage that holds temporary posts
let posts = [];

// routes within the program
app.get("/", (req, res) => {
  res.render("index", { posts });
});

// looks at post thats made
    // tells who the author of the post was
    // tells what time the post was made at
    // tells what category/type of post it is
    // tells the contents of the post 
app.post("/add-post", (req, res) => {
  const { author, title, content, category } = req.body;
  const newPost = {
    id: Date.now(), author, title, content, category, createdAt: new Date().toLocaleString()
  };
  posts.push(newPost);
  res.redirect("/");
});

// editing portion for the post thats made
app.get("/edit/:id", (req, res) => { 
  const post = posts.find(p => p.id == req.params.id);
  if (!post) return res.redirect("/");
  res.render("edit", { post });
});

// handles the editing of posts
app.post("/edit/:id", (req, res) => {
  const postIndex = posts.findIndex(p => p.id == req.params.id);
  // sees if the post id exists
  if (postIndex !== -1) {
    // updates the authors, title, content, and categories.
    posts[postIndex].author = req.body.author;
    posts[postIndex].title = req.body.title;
    posts[postIndex].content = req.body.content;
    posts[postIndex].category = req.body.category;
  }  
  // after the post is updated, then it sends the person back to the original webpage
  res.redirect("/");
});

// delete portion of the post, allows for user to delete any post that they made
app.post("/delete/:id", (req, res) => {
  posts = posts.filter(p => p.id != req.params.id);
  res.redirect("/");
});

// server starter
app.listen(3000, () => console.log("Server running at http://localhost:3000"));