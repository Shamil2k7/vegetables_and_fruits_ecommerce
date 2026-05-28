import mongoose from "mongoose";

const userSchema =
  new mongoose.Schema({

    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      default: "",
    },

    address: {
      type: String,
      default: "",
    },

    city: {
      type: String,
      default: "",
    },

    zipCode: {
      type: String,
      default: "",
    },

    isAdmin: {
      type: Boolean,
      default: false,
    },

    /* ===== BLOCK USER ===== */

    isBlocked: {
      type: Boolean,
      default: false,
    },

  },

  {
    timestamps: true,
  }

);

const User =
  mongoose.model(
    "User",
    userSchema
  );

export default User;