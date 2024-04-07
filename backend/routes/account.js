const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middleware");
const { Account, Transaction } = require("../db");
const { default: mongoose } = require("mongoose");

router.get("/balance", authMiddleware, async (req, res) => {
  const user = await Account.findOne({ userId: req.userId });
  res.status(200).json({
    balance: user.balance,
  });
});

// using trancations
router.post("/transfer", authMiddleware, async (req, res) => {
  const session = await mongoose.startSession();

  session.startTransaction();
  const { to, amount } = req.body;

  // account details
  const sender = await Account.findOne({ userId: req.userId }).session(session);

  if (!sender || sender.balance < amount) {
    await session.abortTransaction();
    return res.status(400).json({
      message: "Insufficient balance",
    });
  }

  const receiver = await Account.findOne({ userId: to })
    .populate("userId")
    .session(session);

  if (!receiver) {
    await session.abortTransaction();
    return res.status(400).json({
      message: "Invalid account",
    });
  }

  // transfer
  // deduct amount from the sender's balance
  await Account.updateOne(
    { userId: req.userId },
    { $inc: { balance: -amount } }
  ).session(session);
  // increase amount in the receiver's balance
  await Account.updateOne(
    { userId: to },
    { $inc: { balance: amount } }
  ).session(session);

  //commit the transaction
  await session.commitTransaction();

  // log the transaction
  const result = await Transaction.create({
    userId: req.userId,
    amount,
    to: receiver.userId.email,
  });

  console.log(result);

  return res.json({
    message: "Transfer successful",
  });
});

router.get("/transactions", authMiddleware, async (req, res) => {
  const transactions = await Transaction.findOne({ userId: req.userId });
  res.status(200).json({
    transactions,
  });
});

module.exports = router;
