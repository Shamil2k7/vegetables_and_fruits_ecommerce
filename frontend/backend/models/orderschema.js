import mongoose from "mongoose";

/* =========================
   ORDER ITEM SCHEMA
========================= */

const OrderItemSchema =
  new mongoose.Schema({

    productId: {
      type:
        mongoose.Schema.Types.ObjectId,

      ref: "Product",

      required: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    quantity: {
      type: Number,
      required: true,
      min: 1,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

  });

/* =========================
   SHIPPING ADDRESS
========================= */

const ShippingAddressSchema =
  new mongoose.Schema({

    street: {
      type: String,
      required: true,
      trim: true,
    },

    city: {
      type: String,
      required: true,
      trim: true,
    },

    state: {
      type: String,
      required: true,
      trim: true,
    },

    postalCode: {
      type: String,
      required: true,
      trim: true,
    },

    country: {
      type: String,
      required: true,
      default: "India",
      trim: true,
    },

  });

/* =========================
   ORDER SCHEMA
========================= */

const OrderSchema =
  new mongoose.Schema({

    userId: {

      type:
        mongoose.Schema.Types.ObjectId,

      ref: "User",

      required: true,

    },

    items: {

      type: [OrderItemSchema],

      required: true,

      validate: {

        validator: function (
          value
        ) {

          return (
            value.length > 0
          );

        },

        message:
          "Order must contain at least one item",

      },

    },

    totalItems: {

      type: Number,

      required: true,

      min: 1,

    },

    totalPrice: {

      type: Number,

      required: true,

      min: 0,

    },

    shippingAddress: {

      type:
        ShippingAddressSchema,

      required: true,

    },

    paymentId: {

      type: String,

      default: "",

    },

    orderId: {

      type: String,

      default: "",

    },

    paymentStatus: {

      type: String,

      enum: [
        "Pending",
        "Paid",
        "Failed",
      ],

      default: "Pending",

    },

    status: {

      type: String,

      enum: [
        "Pending",
        "Processing",
        "Shipped",
        "Delivered",
        "Cancelled",
      ],

      default: "Pending",

    },

  },
  {
    timestamps: true,
  });

/* =========================
   EXPORT MODEL
========================= */

const Order =
  mongoose.model(
    "Order",
    OrderSchema
  );

export default Order;