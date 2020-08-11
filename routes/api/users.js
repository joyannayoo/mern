const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");

// bringing in user model for registration
const User = require("../../models/User");

// @route           api/users/test
// @description     tests users route
// @access          public
router.get("/test", (req, res) => res.json({ message: "users works" }));

// @route           api/users/register
// @description     register user
// @access          public
router.post("/register", (req, res) => {
  // does email exist?
  User.findOne({
    email: req.body.email,
  }).then((user) => {
    if (user) {
      return res.status(400).json({
        email: "email already exists",
      });
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: "200", // size
        r: "pg", // rating
        d: "mm", // default
      });

      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        avatar,
      });

      // to encrypt the password
      bcrypt.genSalt(10, (error, salt) => {
        bcrypt.hash(newUser.password, salt, (error, hash) => {
          if (error) throw error;
          newUser.password = hash;
          newUser
            .save()
            .then((user) => res.json(user))
            .catch((error) => console.log(`error with bcrypt: ${error}`));
        });
      });
    }
  });
});

// must export for server.js to pick route up
module.exports = router;
