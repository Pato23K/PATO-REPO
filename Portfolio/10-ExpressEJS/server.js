const express = require("express");
const app = express();
const path = require("path");

// Configuración del servidor
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let posts = [];
let name;

// Ruta para la página de inicio
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/html/index.html"));
});

app.get("/login", (req, res) => {
  name = req.query.name;
  res.send(`Hello, ${name}! You have entered with a secure method (GET).`);
});

app.post("/login", (req, res) => {
  name = req.body.name;
  res.redirect("/welcome");
});

app.get("/welcome", (req, res) => {
  if (!name) {
    return res.redirect("/");
  }
  res.render("test", { name });
});

app.get("/home", (req, res) => {
  if (!name) {
    return res.redirect("/");
  }
  res.render("home", { name, posts });
});

app.post("/addPost", (req, res) => {
  const { title, content } = req.body;
  posts.push({ title, content });
  res.redirect("/home");
});

app.get("/post/:id", (req, res) => {
  const postIndex = req.params.id;
  const post = posts[postIndex];
  if (!post) {
    return res.redirect("/home");
  }
  res.render("post", { post, postIndex });
});

app.post("/deletePost/:id", (req, res) => {
  const postIndex = req.params.id;
  posts.splice(postIndex, 1);
  res.redirect("/home");
});

app.post("/editPost/:id", (req, res) => {
  const postIndex = req.params.id;
  const newContent = req.body.content;
  if (posts[postIndex]) {
    posts[postIndex].content = newContent;
  }
  res.redirect(`/post/${postIndex}`);
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
