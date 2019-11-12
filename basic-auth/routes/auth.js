const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const router = express.Router();

router.get("/signup", (req, res) => {
  res.render("signup.hbs");
});

router.post("/signup", (req, res) => {
  // const username = req.body.username;
  // const password = req.body.password;
  const { username, password } = req.body;

  if (!username) {
    res.render("signup.hbs", { message: "Username can't be empty" });
    return;
  }
  if (password.length < 8) {
    res.render("signup.hbs", { message: "Password is too short" });
    return;
  }
  User.findOne({ username: username }).then(found => {
    if (found) {
      res.render("signup.hbs", { message: "Username is already taken" });
      return;
    }
    // create a hash of the password
    bcrypt
      .genSalt()
      .then(salt => {
        console.log("salt: ", salt);
        return bcrypt.hash(password, salt);
      })
      .then(hash => {
        console.log("hash: ", hash);
        return User.create({ username: username, password: hash });
      })
      .then(newUser => {
        console.log(newUser);
        res.redirect("/");
      });
  });
});

module.exports = router;
