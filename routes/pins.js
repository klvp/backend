/** @format */

import express from "express";
import { Pins } from "../models/pin.js";

const router = express.Router();

router.post("/createpin", async (req, res) => {
  try {
    const newPin = new Pins(req.body);
    const pin = await newPin.save();
    res.status(200).json({ _id: pin._id });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/allpins", async (req, res) => {
  try {
    const pins = await Pins.find();
    res.status(200).json(pins);
  } catch (error) {
    res.status(500).json(error);
  }
});

export const pinRouter = router;
