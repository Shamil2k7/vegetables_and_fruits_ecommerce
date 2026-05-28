"use client";

import React, {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import "./OrderModal.css";

export default function OrderModal({
  isOpen,
  onClose,
  cartItems,
  subtotal,
}) {

  const [user, setUser] =
    useState(null);

  const [shippingAddress,
    setShippingAddress] =
    useState({
      street: "",
      city: "",
      state: "",
      postalCode: "",
      country: "India",
    });

  const [isSubmitting,
    setIsSubmitting] =
    useState(false);

  /* =========================
     LOAD USER DATA
  ========================= */

  useEffect(() => {

    const savedUser =
      JSON.parse(
        localStorage.getItem("user")
      );

    if (savedUser) {

      setUser(savedUser);

      setShippingAddress({
        street:
          savedUser.address || "",

        city:
          savedUser.city || "",

        state:
          savedUser.state || "",

        postalCode:
          savedUser.zipCode || "",

        country: "India",
      });

    }

  }, []);

  /* =========================
     LOAD RAZORPAY SCRIPT
  ========================= */

  useEffect(() => {

    const script =
      document.createElement("script");

    script.src =
      "https://checkout.razorpay.com/v1/checkout.js";

    script.async = true;

    document.body.appendChild(script);

  }, []);

  if (!isOpen) return null;

  /* =========================
     INPUT CHANGE
  ========================= */

  const handleInputChange =
    (e) => {

      const { name, value } =
        e.target;

      setShippingAddress(
        (prev) => ({
          ...prev,
          [name]: value,
        })
      );

    };

  /* =========================
     HANDLE ORDER + PAYMENT
  ========================= */

  const handlePlaceOrder =
    async (e) => {

      e.preventDefault();

      setIsSubmitting(true);

      try {

        /* =========================
           CREATE RAZORPAY ORDER
        ========================= */

        const paymentRes =
          await axios.post(
            "http://localhost:5000/api/payment/create-order",
            {
              amount: subtotal,
            }
          );

        const razorpayOrder =
          paymentRes.data.order;

        /* =========================
           CHECK RAZORPAY
        ========================= */

        if (!window.Razorpay) {

          alert(
            "Razorpay SDK failed to load"
          );

          return;

        }

        /* =========================
           RAZORPAY OPTIONS
        ========================= */

        const options = {

          key:
            process.env
              .NEXT_PUBLIC_RAZORPAY_KEY_ID,

          amount:
            razorpayOrder.amount,

          currency:
            razorpayOrder.currency,

          name:
            "Fresh Organic Store",

          description:
            "Organic Grocery Payment",

          order_id:
            razorpayOrder.id,


          /* =========================
             PAYMENT SUCCESS
          ========================= */

          handler: async function (
            response
          ) {

            try {

              const orderPayload = {

                userId:
                  user?._id ||
                  user?.id,

                items:
                  cartItems.map(
                    (item) => ({

                      productId:
                        item._id,

                      name:
                        item.title ||
                        item.name,

                      quantity:
                        Number(
                          item.quantity
                        ),

                      price:
                        Number(
                          item.price
                        ),

                    })
                  ),

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
                  response.razorpay_payment_id,

                orderId:
                  response.razorpay_order_id,

              };

              const saveOrder =
                await axios.post(
                  "http://localhost:5000/api/order",
                  orderPayload
                );

              console.log(
                saveOrder.data
              );

              localStorage.removeItem(
                "cart"
              );

              alert(
                "Payment successful & order placed!"
              );

              onClose();

              window.location.href =
                "/user/profile";

            } catch (error) {

              console.log(
                "ORDER ERROR:",
                error.response?.data
              );

              alert(
                error.response?.data
                  ?.message ||
                "Order saving failed"
              );

            }

          },

          /* =========================
             USER PREFILL
          ========================= */

          prefill: {

            name:
              user?.name || "",

            email:
              user?.email || "",

            contact:
              user?.phone || "",

          },

          /* =========================
             NOTES
          ========================= */

          notes: {

            address:
              shippingAddress.street,

          },

          /* =========================
             THEME
          ========================= */

          theme: {
            color: "#16a34a",
          },

        };

        /* =========================
           OPEN RAZORPAY
        ========================= */

        const razorpay =
          new window.Razorpay(
            options
          );

        razorpay.open();

      } catch (error) {

        console.log(error);

        alert(
          "Payment failed"
        );

      } finally {

        setIsSubmitting(false);

      }

    };

  return (

    <div
      className="modal-overlay"
      onClick={onClose}
    >

      <div
        className="modal-card animate-slide-up"
        onClick={(e) =>
          e.stopPropagation()
        }
      >

        {/* HEADER */}

        <header className="modal-header">

          <div>

            <h2>
              Confirm Your Order
            </h2>

            <p className="modal-subtitle">
              Fresh organic items ready
              for dispatch
            </p>

          </div>

          <button
            className="close-x-btn"
            onClick={onClose}
          >
            ✕
          </button>

        </header>

        {/* FORM */}

        <form
          onSubmit={handlePlaceOrder}
          className="modal-form-body"
        >

          <div className="modal-split-layout">

            {/* LEFT SIDE */}

            <div className="form-inputs-column">

              <h3 className="column-section-title">
                Shipping Address
              </h3>

              <div className="input-group">

                <label>
                  Street Address
                </label>

                <input
                  type="text"
                  name="street"
                  value={
                    shippingAddress.street
                  }
                  onChange={
                    handleInputChange
                  }
                  placeholder="House No, Street"
                  required
                />

              </div>

              <div className="form-input-row">

                <div className="input-group">

                  <label>
                    City
                  </label>

                  <input
                    type="text"
                    name="city"
                    value={
                      shippingAddress.city
                    }
                    onChange={
                      handleInputChange
                    }
                    required
                  />

                </div>

                <div className="input-group">

                  <label>
                    State
                  </label>

                  <input
                    type="text"
                    name="state"
                    value={
                      shippingAddress.state
                    }
                    onChange={
                      handleInputChange
                    }
                    required
                  />

                </div>

              </div>

              <div className="form-input-row">

                <div className="input-group">

                  <label>
                    Postal Code
                  </label>

                  <input
                    type="text"
                    name="postalCode"
                    value={
                      shippingAddress.postalCode
                    }
                    onChange={
                      handleInputChange
                    }
                    required
                  />

                </div>

                <div className="input-group">

                  <label>
                    Country
                  </label>

                  <input
                    type="text"
                    name="country"
                    value={
                      shippingAddress.country
                    }
                    onChange={
                      handleInputChange
                    }
                    required
                  />

                </div>

              </div>

            </div>

            {/* RIGHT SIDE */}

            <div className="order-summary-column">

              <h3 className="column-section-title">
                Receipt Breakdown
              </h3>

              <div className="summary-items-mini-list">

                {cartItems.map(
                  (item, idx) => (

                    <div
                      key={idx}
                      className="mini-item-row"
                    >

                      <span className="mini-item-name">

                        {item.title ||
                          item.name}

                        <strong className="item-qty-x">
                          x{item.quantity}
                        </strong>

                      </span>

                      <span className="mini-item-subtotal">

                        ₹
                        {(
                          item.price *
                          item.quantity
                        ).toFixed(2)}

                      </span>

                    </div>

                  )
                )}

              </div>

              <hr className="summary-divider-line" />

              <div className="total-price-row">

                <span>
                  Grand Total:
                </span>

                <span className="rupee-value">
                  ₹
                  {subtotal.toFixed(2)}
                </span>

              </div>

              <button
                type="submit"
                className="submit-order-btn"
                disabled={isSubmitting}
              >

                {isSubmitting
                  ? "Processing..."
                  : "Pay & Place Order →"}

              </button>

            </div>

          </div>

        </form>

      </div>

    </div>

  );

}