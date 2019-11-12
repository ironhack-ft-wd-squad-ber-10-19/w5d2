const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const router = express.Router();

router.get("/signup", (req, res) => {
  res.render("signup.hbs");
});

router.get("/login", (req, res) => {
  res.render("login.hbs");
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  User.findOne({ username: username })
    .then(found => {
      if (!found) {
        res.render("login.hbs", {
          message: "Invalid credentials"
        });
        return;
      }
      bcrypt.compare(password, found.password).then(bool => {
        if (bool === false) {
          res.render("login.hbs", {
            message: "Invalid credentials"
          });
          return;
        }
        // we want to log the user in
        req.session.user = found;
        res.redirect("/");
      });
    })
    .catch(err => {
      console.log(err);
    });
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
        req.session.user = newUser;
        res.redirect("/");
      });
  });
});

router.get("/logout", (req, res) => {
  req.session.destroy(err => {
    if (err) console.log(err);
    else res.redirect("/");
  });
});

module.exports = router;
