const express = require("express");
const router = express.Router();
const passport = require("../middleware/passport-config");

class GoogleController {
  ggEmail(req, res, next) {
    passport.authenticate("google", {
      scope: ["profile", "email"],
    });
  }

  callback(req, res, next) {
    passport.authenticate("google", {
      failureRedirect: "/login",
      successRedirect: "/",
      failureFlash: true,
    });
  }
}
module.exports = new GoogleController();
