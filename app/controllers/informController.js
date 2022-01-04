const express = require("express");
const router = express.Router();

const Inform = require("../models/inform");
const TypeInform = require("../models/typeInform");

const middle = require("../middleware/authentication");
const mySocket = require("../config-socket");

class InformController {
  notify = async (req, res, next) => {
    try {
      const { id } = req.query;
      if (id && id != "") {
        const inform = await Inform.findById(id)
          .populate("idType")
          .populate("idOwner");

        res.render("informInfor", {
          title: req.user.name,
          user: req.user,
          inform,
        });
      } else {
        let { type, page } = req.query;

        if (typeof type == "undefined") {
          type = "all";
        }
        if (typeof page == "undefined") {
          page = 1;
        }

        page = Number(page);

        const per = 5;

        let listInform = [];
        let totalInform = 0;
        if (type == "all") {
          listInform = await Inform.find()
            .populate("idType")
            .limit(per)
            .skip((page - 1) * per)
            .sort({ createdAt: -1 });
          totalInform = await Inform.count();
        } else {
          totalInform = await Inform.count({
            idType: type,
          }).count();
          listInform = await Inform.find({
            idType: type,
          })
            .populate("idType")
            .limit(per)
            .skip((page - 1) * per)
            .sort({ createdAt: -1 });
        }

        const totalPage = Math.ceil(totalInform / per);

        const listTypeInform = await TypeInform.find();
        res.render("listInformTDTU", {
          title: "Generator-Express MVC",
          user: req.user,
          listInform,
          listTypeInform,
          type,
          back: page > 1 ? true : false,
          next: page < totalPage ? true : false,
          currentPage: page,

          idType: type,
        });
      }
    } catch (err) {
      console.log(err);
      res.redirect("back");
    }
  };
  // Tạo thong Báo
  createNotify = async (req, res, next) => {
    try {
      const { title, content } = req.body;
      const type = req.user.manageTopic;

      const inform = new Inform({
        idOwner: req.user._id,
        title,
        content,
        createdAt: new Date(),
        idType: type._id,
      });

      await inform.save();
      //Realtime thông báo
      //Dùng Socket để gửi tới client
      mySocket.getIO().local.emit("haveNewInform", "ok");
      res.redirect("back");
    } catch (err) {
      console.log(err);
      res.redirect("back");
    }
  };
  // Trả thong Baó
  returnNotify = async (req, res, next) => {
    try {
      const listInform = await Inform.find()
        .populate("idType")
        .limit(5)
        .sort({ createdAt: -1 });
    } catch (err) {
      console.log(err);
      res.status(401);
    }
  };
  deleteNotify(req, res, next) {
    try {
      const { id } = req.params;
      Inform.findByIdAndRemove(id).exec();
      res.redirect("/inform");
    } catch (err) {
      res.redirect("back");
    }
  }
  editNotify = async (req, res, next) => {
    try {
      const { idInform, title, content } = req.body;
      const userID = req.user._id;
      await Inform.findById(idInform, async (err, doc) => {
        if (err) {
          throw new Error();
        }
        if (String(doc.idOwner) == userID) {
          doc.title = title;
          doc.content = content;
          doc.save();
          res.redirect("back");
        }
      });
    } catch (err) {
      console.log(err);
      res.redirect("/");
    }
  };
}

module.exports = new InformController();
