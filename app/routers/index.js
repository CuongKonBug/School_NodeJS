const testRouter = require("./home");
const ggRouter = require("./google");
const commentRouter = require("./comment");
const postRouter = require("./post");
const informRouter = require("./inform");
const typeInformRouter = require("./typeInform");
const userRouter = require("./user");

function router(app) {
  app.use("/google", ggRouter);
  app.use("/comment", commentRouter);
  app.use("/post", postRouter);
  app.use("/inform", informRouter);
  app.use("/typeInform", typeInformRouter);
  app.use("/user", userRouter);
  app.use("/", testRouter);
}

module.exports = router;
