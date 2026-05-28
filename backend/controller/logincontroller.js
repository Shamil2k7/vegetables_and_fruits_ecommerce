import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import User from "../models/loginschema.js";

/* ==========================================
   LOGIN USER
========================================== */

export const loginUser = async (req, res) => {

    try {

        const { email, password } = req.body;

        /* ===== VALIDATION ===== */

        if (!email || !password) {

            return res.status(400).json({

                success: false,

                message:
                    "Email and password are required",

            });

        }

        /* ===== FIND USER ===== */

        const user = await User.findOne({
            email: email.toLowerCase(),
        });

        if (!user) {

            return res.status(401).json({

                success: false,

                message:
                    "Invalid email or password",

            });

        }

        /* ===== CHECK PASSWORD ===== */

        const isMatch =
            await bcrypt.compare(
                password,
                user.password
            );

        if (!isMatch) {

            return res.status(401).json({

                success: false,

                message:
                    "Invalid email or password",

            });

        }

        if (user.isBlocked) {

            return res.status(403).json({

                success: false,

                message:
                    "Your account has been blocked by admin",

            });

        }

        /* ===== CREATE TOKEN ===== */

        const token = jwt.sign(

            {
                id: user._id,
                email: user.email,
                isAdmin: user.isAdmin,
            },

            process.env.JWT_SECRET ||
            "mysecretkey",

            {
                expiresIn: "7d",
            }

        );

        /* ===== RESPONSE ===== */

        return res.status(200).json({

            success: true,

            message:
                "Login successful",

            token,

            user: {

                id: user._id,

                name: user.name,

                email: user.email,

                phone: user.phone,

                address: user.address,

                city: user.city,

                zipCode: user.zipCode,

                isAdmin: user.isAdmin,

            },

        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({

            success: false,

            message:
                "Server error during login",

            error: error.message,

        });

    }

};

/* ==========================================
   SIGNUP USER
========================================== */

export const signupUser = async (req, res) => {

    try {

        const {
            name,
            email,
            password,
        } = req.body;

        /* ===== VALIDATION ===== */

        if (
            !name ||
            !email ||
            !password
        ) {

            return res.status(400).json({

                success: false,

                message:
                    "All fields are required",

            });

        }

        if (password.length < 6) {

            return res.status(400).json({

                success: false,

                message:
                    "Password must be at least 6 characters",

            });

        }

        /* ===== CHECK USER ===== */

        const existingUser =
            await User.findOne({
                email:
                    email.toLowerCase(),
            });

        if (existingUser) {

            return res.status(409).json({

                success: false,

                message:
                    "User already exists",

            });

        }

        /* ===== HASH PASSWORD ===== */

        const hashedPassword =
            await bcrypt.hash(
                password,
                10
            );

        /* ===== CREATE USER ===== */

        const newUser =
            await User.create({

                name,

                email:
                    email.toLowerCase(),

                password:
                    hashedPassword,

            });

        return res.status(201).json({

            success: true,

            message:
                "Signup successful",

            user: {

                id: newUser._id,

                name: newUser.name,

                email: newUser.email,

            },

        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({

            success: false,

            message:
                "Server error during signup",

            error: error.message,

        });

    }

};

/* ==========================================
   UPDATE ADDRESS
========================================== */

export const updateAddress =
    async (req, res) => {

        try {

            const { userId } =
                req.params;

            const {
                address,
                city,
                zipCode,
            } = req.body;

            /* ===== VALID ID ===== */

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

            /* ===== UPDATE ===== */

            const updatedUser =
                await User.findByIdAndUpdate(

                    userId,

                    {
                        address,
                        city,
                        zipCode,
                    },

                    {
                        new: true,
                    }

                ).select("-password");

            if (!updatedUser) {

                return res.status(404).json({

                    success: false,

                    message:
                        "User not found",

                });

            }

            return res.status(200).json({

                success: true,

                message:
                    "Address updated",

                user: updatedUser,

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
   UPDATE PROFILE
========================================== */

export const updateProfile =
    async (req, res) => {

        try {

            const { userId } =
                req.params;

            const {
                firstName,
                lastName,
                phone,
                address,
                city,
                zipCode,
            } = req.body;

            /* ===== VALID ID ===== */

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

            /* ===== FIND USER ===== */

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

            /* ===== UPDATE DATA ===== */

            user.name =
                `${firstName} ${lastName}`;

            user.phone =
                phone || "";

            user.address =
                address || "";

            user.city =
                city || "";

            user.zipCode =
                zipCode || "";

            await user.save();

            return res.status(200).json({

                success: true,

                message:
                    "Profile updated",

                user,

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

    export const getAllUsers =
  async (req, res) => {

    try {

      const users =
        await User.find()
          .select("-password");

      return res.status(200).json({

        success: true,

        users,

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

/* =========================
   BLOCK USER
========================= */

export const blockUser =
  async (req, res) => {

    try {

      const { id } =
        req.params;

      await User.findByIdAndUpdate(
        id,
        {
          isBlocked: true,
        }
      );

      return res.status(200).json({

        success: true,

        message:
          "User blocked",

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

/* =========================
   UNBLOCK USER
========================= */

export const unblockUser =
  async (req, res) => {

    try {

      const { id } =
        req.params;

      await User.findByIdAndUpdate(
        id,
        {
          isBlocked: false,
        }
      );

      return res.status(200).json({

        success: true,

        message:
          "User unblocked",

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