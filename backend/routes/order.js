// routes/order.js

import express from "express";

import {
  createOrder,
  getMyOrders,
  getSingleOrder,
  getAllOrders,
  cancelOrder,
  updateOrderStatus,
} from "../controller/ordercontroller.js";

export const orderRouter =
  express.Router();

/* =========================
   CREATE ORDER
========================= */

orderRouter.post(
  "/",
  createOrder
);

/* =========================
   GET ALL ORDERS (ADMIN)
========================= */

orderRouter.get(
  "/admin/all",
  getAllOrders
);

/* =========================
   GET USER ORDERS
========================= */

orderRouter.get(
  "/user/:userId",
  getMyOrders
);

/* =========================
   GET SINGLE ORDER
========================= */

orderRouter.get(
  "/:orderId",
  getSingleOrder
);

/* =========================
   CANCEL ORDER
========================= */

orderRouter.put(
  "/:orderId/cancel",
  cancelOrder
);

/* =========================
   UPDATE ORDER STATUS
========================= */

orderRouter.put(
  "/:orderId/status",
  updateOrderStatus
);