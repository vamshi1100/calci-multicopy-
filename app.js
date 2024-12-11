const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "public/html"));
app.use(express.static(path.join(__dirname, "public")));

// Serve the JavaScript file from the views directory
app.get("/views/view.js", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "view.js"));
});
app.get("/db/model.js", (req, res) => {
  res.sendFile(path.join(__dirname, "db", "model.js"));
});
app.get("/controller/controller.js", (req, res) => {
  res.sendFile(path.join(__dirname, "controller", "controller.js"));
});

mongoose
  .connect("mongodb://127.0.0.1:27017/calci")
  .then(() => {
    console.log("Successfully connected to MongoDB.");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

app.get("/", (req, res) => {
  res.render("calci");
});

app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`);
});
