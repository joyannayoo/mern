// lines 3-12 is enough to get our server running
// in terminal you can run "node server" which runs server.js
// in browser, you can run server.js at localhost:5000

const express = require("express");
const mongoose = require("mongoose");

const bodyParser = require("body-parser");

// connecting routes
const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const posts = require("./routes/api/posts");

const app = express();

// body-parser middleware
// can access then "body" in requests (ie. req.body.email)
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB config
const db = require("./config/keys").mongoURI;

// connect to mongodb
mongoose.set("useNewUrlParser", true);
mongoose.set("useUnifiedTopology", true);

mongoose
  .connect(db)
  .then(() => console.log("mongodb connected"))
  .catch((err) => console.log(`error: ${err}`));

app.get("/", (req, res) => res.send("Hello World"));

// use routes
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);

// to run on heroku, then on local (5000)
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
