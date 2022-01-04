const express = require("express");
const router = express.Router();
const middle = require("../middleware/authentication");

const User = require("../models/user");
const TypeInform = require("../models/typeInform");
const ListUser = require("../models/user");

class HomeController {
  index = async (req, res, next) => {
    const listTypeInform = await TypeInform.find();
    const listUser = await ListUser.find().limit(5);

    res.render("index", {
      title: "Home",
      user: req.user,
      target: "home",
      listTypeInform,
      listUser,
    });
    console.log("hhih");
  };

  login(req, res, next) {
    if (!req.user) {
      res.render("login", {
        title: "Generator-Express MVC",
      });
    } else {
      res.redirect("/");
    }
  }

  admin = async (req, res, next) => {
    const listType = await TypeInform.find();

    const listUser = await User.find({
      role: "faculty",
    })
      .populate("manageTopic")
      .exec();

    res.render("adminPage", {
      title: "Generator-Express MVC",
      user: req.user,
      listType,
      listUser,
      target: "admin",
    });
  };
}

module.exports = new HomeController();
