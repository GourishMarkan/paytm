const express = require("express");

const { User, Account } = require("../../db");
const zod = require("zod");
const jwt = require("jsonwebtoken");
// const asyncHandler = require("express-async-handler");
const JWT_SECRET = require("../../config");
const { authMiddleware } = require("../../middleware");
const router = express.Router();
// hashinh password-
// const bcrypt = require("bcrypt");
const signupBody = zod.object({
  username: zod.string().email(),
  firstName: zod.string(),
  lastName: zod.string(),
  password: zod.string(),
});

const signinBody = zod.object({
  username: zod.string().email(),
  password: zod.string(),
});

const updateBody = zod.object({
  password: zod.string().optional(),
  firstName: zod.string().optional(),
  lastName: zod.string().optional(),
});
// signUP------
router.post("/signUp", async (req, res, next) => {
  const { success } = signupBody.safeParse(req.body);
  if (!sucess) {
    return res.status(411).json({
      message: "Email already taken / Incorrect inputs",
    });
  }
  const existingUser = await User.findOne({
    username: req.body.username,
  });

  if (existingUser) {
    return res.status(411).json({
      message: "Email already taken/Incorrect inputs",
    });
  }
  const user = await User.create({
    username: req.body.username,
    // password: req.body.password,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
  });
  // hashing password--
  const hashedPassword = await user.createHash(req.body.password);
  user.password_hash = hashedPassword;

  // Save newUser object to database-
  await user.save();

  const userId = user._id;

  // account bal on signUp reward--
  await Account.create({
    userId,
    balance: 1 + Math.random() * 10000,
  });

  const token = jwt.sign(
    {
      userId,
    },
    JWT_SECRET
  );
  res.json({
    message: "User created successfully",
    token: token,
  });
  console.log("signup working");
});
// SignIn-----
router.post("/signIn", authMiddleware, async (req, res, next) => {
  const { success } = signinBody.safeParse(req.body);
  if (!success) {
    return res.status(411).json({
      message: "Incorrect inputs",
    });
  }
  // Find user with requested email
  const user = await User.findOne({
    username: req.body.username,
  });
  if (user) {
    if (await user.validatePassword(req.body.password)) {
      const token = jwt.sign(
        {
          userId: user._id,
        },
        JWT_SECRET
      );

      return res.status(200).json({
        message: "User Successfully Logged In",
        token: token,
      });
    } else {
      return res.status(411).json({
        message: "Incorrect Password",
      });
    }
  } else {
    return res.status(411).json({
      message: "error while logging in  ",
    });
  }
});
// update---
router.put("/", authMiddleware, async (req, res, next) => {
  const { sucess } = updateBody.safeParse(req.body);
  if (!sucess) {
    return res.status(411).json({
      message: "Error while updating information",
    });
  }

  await User.updateOne({ id: req.userId }, req.body);
  res.json({
    message: "Updated successfully",
  });

  console.log("update");
});

// get--
router.get("/bulk", async (req, res) => {
  const filter = req.query.filter || "";
  const users = await User.find({
    $or: [
      {
        firstName: {
          $regex: filter,
        },
      },
      {
        lastName: {
          $regex: filter,
        },
      },
    ],
  });
  res.json({
    user: users.map((user) => ({
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      _id: user._id,
    })),
  });
});

module.exports = router;
