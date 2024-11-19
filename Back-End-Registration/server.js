import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import authRouter from "./routes/authRouter.js";
import postRouter from "./routes/postRouter.js";

await mongoose.connect(process.env.MONGODB_URI);
const app = express();

app.use(express.json());
app.use(cors());
app.use("/api/auth", authRouter);
app.use("/api", postRouter);

app.listen("3000", () => console.log("server started on port 3000"));