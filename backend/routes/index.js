const express = require("express");
const router = express.Router();

const userRouter = require("./user");
const accRouter = require("./account");

router.use("/user", userRouter);
router.use("/account", accRouter);

router.get("/", (req, res) => {
  return res.json({ message: "healthy server" });
});

module.exports = router;
