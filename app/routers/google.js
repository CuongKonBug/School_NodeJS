const express = require("express");
const router = express.Router();
const googleController = require("../controllers/googleController");
const middle = require("../middleware/authentication");
const passport = require("../middleware/passport-config");

router.route("/").get(
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.route("/callback").get(
  passport.authenticate("google", {
    failureRedirect: "/login",

    successRedirect: "/",
    failureFlash: true,
  })
);
module.exports = router;
