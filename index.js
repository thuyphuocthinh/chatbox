// import
const express = require("express");
const app = express();
const dotenv = require("dotenv");
const path = require("path");
const clientRoutes = require("./routes/api/v1/index.route");
const bodyParser = require("body-parser");

// dotenv
dotenv.config();

// views
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

// public file
app.use(express.static(path.join(__dirname, "public")));

// bodyparser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// routes
clientRoutes(app);

app.get("/chat", (req, res) => {
  return res.render("clients/pages/chat/index", {
    pageTitle: "Chatbox",
  });
});

app.get("/", (req, res) => {
  return res.render("clients/pages/landing/index", {
    pageTitle: "TourGuideBox",
  });
});

// listen
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App listening on port ${3000}`);
});
