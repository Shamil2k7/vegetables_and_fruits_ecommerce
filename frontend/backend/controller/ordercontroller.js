// controller/ordercontroller.js

import mongoose from "mongoose";

import Order from "../models/orderschema.js";

import User from "../models/loginschema.js";

/* ==========================================
   CREATE ORDER
========================================== */

export const createOrder =
  async (req, res) => {

    try {

      const {
        userId,
        items,
        shippingAddress,
        paymentId,
        orderId,
      } = req.body;

      /* VALIDATION */

      if (
        !userId ||
        !items ||
        items.length === 0 ||
        !shippingAddress
      ) {

        return res.status(400).json({

          success: false,

          message:
            "Missing required fields",

        });

      }

      /* USER ID CHECK */

      if (
        !mongoose.Types.ObjectId.isValid(
          userId
        )
      ) {

        return res.status(400).json({

          success: false,

          message:
            "Invalid user id",

        });

      }

      /* FIND USER */

      const user =
        await User.findById(
          userId
        );

      if (!user) {

        return res.status(404).json({

          success: false,

          message:
            "User not found",

        });

      }

      /* TOTAL CALCULATION */

      let totalPrice = 0;

      let totalItems = 0;

      for (const item of items) {

        if (
          !item.productId ||
          !item.name ||
          !item.quantity ||
          !item.price
        ) {

          return res.status(400).json({

            success: false,

            message:
              "Invalid item data",

          });

        }

        totalPrice +=
          Number(item.price) *
          Number(item.quantity);

        totalItems +=
          Number(item.quantity);

      }

      /* CREATE ORDER */

      const newOrder =
        await Order.create({

          userId,

          items,

          totalItems,

          totalPrice,

          shippingAddress: {

            street:
              shippingAddress.street,

            city:
              shippingAddress.city,

            state:
              shippingAddress.state,

            postalCode:
              shippingAddress.postalCode,

            country:
              shippingAddress.country,

          },

          paymentId:
            paymentId || "",

          orderId:
            orderId || "",

          paymentStatus:
            paymentId
              ? "Paid"
              : "Pending",

          status:
            "Pending",

        });

      return res.status(201).json({

        success: true,

        message:
          "Order created successfully",

        order:
          newOrder,

      });

    } catch (error) {

      console.log(error);

      return res.status(500).json({

        success: false,

        message:
          "Server error",

        error:
          error.message,

      });

    }

  };

/* ==========================================
   GET ALL ORDERS
========================================== */

export const getAllOrders =
  async (req, res) => {

    try {

      const orders =
        await Order.find()

          .populate(
            "userId",
            "name email"
          )

          .sort({
            createdAt: -1,
          });

      return res.status(200).json({

        success: true,

        orders,

      });

    } catch (error) {

      console.log(error);

      return res.status(500).json({

        success: false,

        message:
          "Server error",

      });

    }

  };

/* ==========================================
   GET MY ORDERS
========================================== */

export const getMyOrders =
  async (req, res) => {

    try {

      const { userId } =
        req.params;

      if (
        !mongoose.Types.ObjectId.isValid(
          userId
        )
      ) {

        return res.status(400).json({

          success: false,

          message:
            "Invalid user id",

        });

      }

      const orders =
        await Order.find({
          userId,
        })

          .sort({
            createdAt: -1,
          });

      return res.status(200).json({

        success: true,

        orders,

      });

    } catch (error) {

      console.log(error);

      return res.status(500).json({

        success: false,

        message:
          "Server error",

      });

    }

  };

/* ==========================================
   GET SINGLE ORDER
========================================== */

export const getSingleOrder =
  async (req, res) => {

    try {

      const { orderId } =
        req.params;

      if (
        !mongoose.Types.ObjectId.isValid(
          orderId
        )
      ) {

        return res.status(400).json({

          success: false,

          message:
            "Invalid order id",

        });

      }

      const order =
        await Order.findById(
          orderId
        )

          .populate(
            "userId",
            "name email"
          );

      if (!order) {

        return res.status(404).json({

          success: false,

          message:
            "Order not found",

        });

      }

      return res.status(200).json({

        success: true,

        order,

      });

    } catch (error) {

      console.log(error);

      return res.status(500).json({

        success: false,

        message:
          "Server error",

      });

    }

  };

/* ==========================================
   CANCEL ORDER
========================================== */

export const cancelOrder =
  async (req, res) => {

    try {

      const { orderId } =
        req.params;

      if (
        !mongoose.Types.ObjectId.isValid(
          orderId
        )
      ) {

        return res.status(400).json({

          success: false,

          message:
            "Invalid order id",

        });

      }

      const order =
        await Order.findById(
          orderId
        );

      if (!order) {

        return res.status(404).json({

          success: false,

          message:
            "Order not found",

        });

      }

      order.status =
        "Cancelled";

      await order.save();

      return res.status(200).json({

        success: true,

        message:
          "Order cancelled successfully",

        order,

      });

    } catch (error) {

      console.log(error);

      return res.status(500).json({

        success: false,

        message:
          "Server error",

      });

    }

  };

/* ==========================================
   UPDATE ORDER STATUS
========================================== */

export const updateOrderStatus =
  async (req, res) => {

    try {

      const { orderId } =
        req.params;

      const { status } =
        req.body;

      if (
        !mongoose.Types.ObjectId.isValid(
          orderId
        )
      ) {

        return res.status(400).json({

          success: false,

          message:
            "Invalid order id",

        });

      }

      const order =
        await Order.findById(
          orderId
        );

      if (!order) {

        return res.status(404).json({

          success: false,

          message:
            "Order not found",

        });

      }

      order.status =
        status;

      await order.save();

      return res.status(200).json({

        success: true,

        message:
          "Order updated successfully",

        order,

      });

    } catch (error) {

      console.log(error);

      return res.status(500).json({

        success: false,

        message:
          "Server error",

      });

    }

  };