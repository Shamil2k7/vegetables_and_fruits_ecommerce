import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import Product from "./models/productschema.js";
import {  porductRouter } from "./routes/product.js";
import { authRouter } from "./routes/login.js";
import { orderRouter } from "./routes/order.js";
import Payrouter from "./routes/razorpayorder.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));
/* ================= MONGODB CONNECTION ================= */

mongoose
  .connect("mongodb://localhost:27017/Fresh")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

/* ================= API ROUTES ================= */

app.use("/api/auth",authRouter)
app.use('/api/product',porductRouter)
app.use('/api/order',orderRouter)
app.use('/api/payment',Payrouter)

/* ================= SERVER ================= */
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server Running on Port ${PORT}`);
});