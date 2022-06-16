/** @format */

import express from "express";
import { Users } from "../models/user.js";
import bcrypt from "bcrypt";

const router = express.Router();

const genPassword = async (pass) => {
  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash(pass, salt);
  return password;
};

// purpose: User Registeration
// method : POST
router.post("/register", async (req, res) => {
  try {
    const hashedPassword = await genPassword(req.body.password);
    const newUser = new Users({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });
    const user = await newUser.save();
    res.status(200).json(user._id);
  } catch (error) {
    res.status(500).json(error);
  }
});

// puspose: USer Login
// method: POST
router.post("/login", async (req, res) => {
  try {
    const user = await Users.findOne({ username: req.body.username });
    // const validate = await bcrypt.compare(req.body.password, user.password);
    if (!user) {
      res.status(400).json("User not found");
    }
    // const validate = await bcrypt.compare(req.body.password, user.password);
    else if (!(await bcrypt.compare(req.body.password, user.password))) {
      res.status(400).json("Password Incorrect");
    } else {
      res.status(200).json({ _id: user._id, username: user.username });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

export const userRouter = router;
