// import
const express = require("express");
const app = express();
const dotenv = require("dotenv");
const path = require("path");

// dotenv
dotenv.config();

// views
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

// public file
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  return res.render("clients/pages/chat/index", {
    pageTitle: "Chatbox",
  });
});

// listen
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App listening on port ${3000}`);
});
