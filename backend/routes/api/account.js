const express = require("express");
const { authMiddleware } = require("../../middleware");
const { Account } = require("../../db");
const router = express.Router();

// get user bal--
router.get("/balance", authMiddleware, async (res, req) => {
  const account = await Account.findOne({
    userId: req.body.userId,
  });
  res.json({
    balance: account.balance,
  });
});
// transtaction--
// good solution---
router.post("/transfer", authMiddleware, async (req, res) => {
  const session = await mongoose.startSession();
  // starting the transaction--
  session.startTransaction();
  const { amount, to } = req.body;
  // Fetch the accounts within the transaction
  const account = await Account.findOne({ userId: req.userId }).session(
    session
  );
  //  checking a/c exists with sufficent bal.

  if (!account || account.balance < amount) {
    await session.abortTransaction();
    return res.status(400).json({
      message: "Insufficient balance",
    });
  }
  // fetching receiver a/c--
  const toAccount = await Account.findOne({ userId: to }).session(session);
  // checking receiver a/c exist

  if (!toAccount) {
    await session.abortTransaction();
    return res.status(400).json({
      message: "Invalid account",
    });
  }
  // Perform the transfer
  await Account.updateOne(
    { userId: req.userId },
    { $inc: { balance: -amount } }
  ).session(session);
  await Account.updateOne(
    { userId: to },
    { $inc: { balance: amount } }
  ).session(session);

  // Commit the transaction
  await session.commitTransaction();
  res.json({
    message: "Transfer successful",
  });
});
// bad solution--
router.post("/transfer", authMiddleware, async (req, res) => {
  const { amount, to } = req.body;

  const account = await Account.findOne({ userId: req.userId });
  // bal is less then--
  if (account.balance < amount) {
    return res.status(400).json({
      message: "Insufficient balance",
    });
  }
  // finding the reciever a/c-
  const toAccount = await Account.findOne({
    userId: to,
  });
  //  checking whether the a/c exist--
  if (!toAccount) {
    return res.status(400).json({
      message: "Invalid account",
    });
  }
  // updating the bal of sender-
  await Account.updateOne(
    {
      userId: req.userId,
    },
    {
      $inc: {
        balance: -amount,
      },
    }
  );
  // updating the bal of reciever a/c--
  await Account.updateOne(
    {
      userId: to,
    },
    {
      $inc: {
        balance: amount,
      },
    }
  );
  res.json({
    message: "Transfer successful",
  });
});
module.exports = router;
