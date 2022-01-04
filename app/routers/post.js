const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
const middle = require("../middleware/authentication");
const multer = require("multer");
const fs = require("fs-extra");
var upload = multer({ dest: "uploads/" });

router.post("/", middle.checkLogged, upload.any(), postController.createPost);
router.get("/", middle.checkLogged, postController.pagePost);
router.post("/heart", middle.checkLogged, postController.reactPost);
router.patch("/", middle.checkLogged, upload.any(), postController.repairPost);
router.delete("/", middle.checkLogged, postController.deletePost);

module.exports = router;
