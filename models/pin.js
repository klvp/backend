/** @format */

import mongoose from "mongoose";

const pinSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      reuired: true,
      min: 3,
      max: 15,
      unique: true,
    },
    des: {
      type: String,
      reuired: true,
      min: 3,
      max: 100,
    },
    rating: {
      type: Number,
      reuired: true,
      min: 1,
      max: 5,
    },
    lat: {
      type: Number,
      reuired: true,
    },
    lon: {
      type: Number,
      reuired: true,
    },
  },
  { timestamps: true }
);

export const Pins = mongoose.model("Pins", pinSchema);
