const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const { z } = require("zod");
const jwt = require("jsonwebtoken");

const { User, Account } = require("../db");
const { JWT_SECRET } = require("../config");
const { authMiddleware } = require("../middleware");

const signupSchema = z.object({
  email: z.string().min(3).max(30).email(),
  firstName: z.string().max(50),
  lastName: z.string().max(50),
  password: z.string(),
});

const signinSchema = z.object({
  email: z.string().min(3).max(30).email(),
  password: z.string(),
});

const updateSchema = z.object({
  firstName: z.string().max(50),
  lastName: z.string().max(50),
  password: z.string(),
});

function validateSignupBody(req, res, next) {
  const isValidated = signupSchema.safeParse(req.body);
  if (isValidated.success) return next();
  return res.status(411).json({
    message: "Email already taken / Incorrect inputs",
  });
}

function validateSigninBody(req, res, next) {
  const isValidated = signinSchema.safeParse(req.body);
  if (isValidated.success) return next();
  return res.status(411).json({
    message: "Incorrect inputs",
  });
}

function validateUpdateBody(req, res, next) {
  const isValidated = updateSchema.safeParse(req.body);
  if (isValidated.success) return next();
  return res.status(411).json({
    message: "Error while updating information",
  });
}

async function existingUser(req, res, next) {
  const { email } = req.body;
  const isUser = await User.findOne({ email });
  if (isUser) {
    return res.status(411).json({
      message: "Email already taken / Incorrect inputs",
    });
  }
  next();
}

router.post("/signup", validateSignupBody, existingUser, async (req, res) => {
  const { email, firstName, lastName, password } = req.body;
  const hashedPW = await bcrypt.hash(password, 10);
  const savedUser = await User.create({
    email,
    firstName,
    lastName,
    password: hashedPW,
  });

  await Account.create({
    userId: savedUser._id,
    balance: Math.floor(Math.random() * 1000000),
  });

  const token = jwt.sign({ userId: savedUser._id }, JWT_SECRET);

  res.status(200).json({
    message: "User created successfully",
    token,
  });
});

router.post("/signin", validateSigninBody, async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const user = await User.findOne({ email });

  if (user) {
    // checking the password
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      const token = jwt.sign({ userId: user._id }, JWT_SECRET);
      return res.status(200).json({
        token,
      });
    }
  }
  return res.status(411).json({
    message: "Error while logging in",
  });
});

router.put("/", validateUpdateBody, authMiddleware, async (req, res) => {
  await User.findByIdAndUpdate(req.userId, req.body);
  res.status(200).json({
    message: "Updated successfully",
  });
});

router.get("/bulk", authMiddleware, async (req, res) => {
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
  res.status(200).json({
    users: users.map((user) => ({
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      _id: user._id,
    })),
  });
});

// me route: returns the information of the currently logged user
router.get("/me", authMiddleware, async (req, res) => {
  const user = await User.findById(req.userId);
  res.status(200).json({
    user,
  });
});

module.exports = router;
