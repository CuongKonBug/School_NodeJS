const express = require("express");
const router = express.Router();
const commentController = require("../controllers/commentController");
const middle = require("../middleware/authentication");

router.post("/", middle.checkLogged, commentController.comment);
router.delete("/", middle.checkLogged, commentController.deleteComment);

module.exports = router;
