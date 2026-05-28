import crypto from "crypto";
import razorpay from "../config/razorpay.js";

// ================= CREATE ORDER =================

export const createRazorpayOrder = async (
  req,
  res
) => {

  try {

    const { amount } = req.body;

    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order =
      await razorpay.orders.create(
        options
      );

    res.json({
      success: true,
      order,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message:
        "Failed to create order",
    });

  }

};

// ================= VERIFY PAYMENT =================

export const verifyPayment = async (
  req,
  res
) => {

  try {

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body;

    const body =
      razorpay_order_id +
      "|" +
      razorpay_payment_id;

    const expectedSignature =
      crypto
        .createHmac(
          "sha256",
          process.env
            .RAZORPAY_KEY_SECRET
        )
        .update(body.toString())
        .digest("hex");

    const isAuthentic =
      expectedSignature ===
      razorpay_signature;

    if (!isAuthentic) {

      return res.status(400).json({
        success: false,
        message:
          "Payment verification failed",
      });

    }

    res.json({
      success: true,
      message:
        "Payment successful",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
    });

  }

};