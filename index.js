/** @format */

import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import { userRouter } from "./routes/users.js";
import { pinRouter } from "./routes/pins.js";

dotenv.config();
const PORT = process.env.PORT || 4000;
const app = express();

app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
  })
  .then(() => console.log("DB Conneted ✌"))
  .catch((err) => console.error(err));

app.use("/api/users", userRouter);
app.use("/api/pins", pinRouter);

app.listen(PORT, () => console.log("Server is UP on Port number", PORT));

app.get("/", (req, res) => res.send("Hello World"));
