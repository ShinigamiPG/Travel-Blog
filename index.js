import express from "express";
import bodyParser from "body-parser";
import {Post} from './postContent.js';
import { amritsarPost, kasolPost, mahabsPost } from "./postContent.js";

const app = express();
const port = 3000;
app.set('view engine', 'ejs');

const posts = [amritsarPost, kasolPost, mahabsPost];

app.use(express.static("public"))
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });

app.get("/", (req, res) => {
  res.render("index.ejs", {posts : posts});
});

app.get('/view', (req, res) => {
  const postTitle = req.query.titleDest; // Get the title from the query parameter
  const post = posts.find(p => p.tit === postTitle); // Find the matching post

  res.render('view', { post }); // Render view.ejs with the post data
});

app.get("/create", (req, res) => {
  res.render("create.ejs");
});

app.post("/saved", (req, res) => {
  // console.log(req.body)
  var uidGenerate = Math.floor(1000000000000000*Math.random())
  var input = req.body;
  if(input.tit==''){
    res.render("index.ejs", {posts: posts})
  } else{
    console.log("HEREEREEEE!!!"+input.uid)
  let postToSave = posts.find(p => p.uid == input.uid);
  console.log(postToSave)
  if (postToSave !== undefined){
    const index = posts.indexOf(postToSave);
    posts.splice(index, 1); // 2nd parameter means remove one item only
    var imgPathResolve = (input.imagePathEdit==='')? input.imagePath : input.imagePathEdit;
    var uidResolve = input.uid;
  } else{
    var imgPathResolve = input.imagePath; 
    var uidResolve = uidGenerate;
  }
  posts.push(new Post(uidResolve, input.tit, input.bestTime, input.location, input.food, input.todo, input.ph, imgPathResolve))
  console.log(posts)
  res.render("index.ejs", {posts: posts});
}});

app.post("/deleted", (req, res) => {
  let input = req.body;
  const postToRemove = posts.find(p => p.tit === Object.keys(input)[0]);
  const index = posts.indexOf(postToRemove);
  if (index > -1) { // only splice array when item is found
    posts.splice(index, 1); // 2nd parameter means remove one item only
  }
  res.render("index.ejs", {posts: posts});
});

