const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
const User = mongoose.model("users"); // from models > user.js
const keys = require("../config/keys");

const options = {};
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = keys.secretOrKey;

module.exports = (passport) => {
  passport.use(
    new JwtStrategy(options, (jwt_payload, done) => {
      //   console.log(jwt_payload);
      User.findById(jwt_payload.id) // findbyid is a mongoose method
        .then((user) => {
          if (user) {
            // error, user
            return done(null, user);
          } // error, false (because there is no user)
          return done(null, false);
        })
        .catch((error) => {
          console.log(`error in passport.js: ${error}`);
        });
    })
  );
};
