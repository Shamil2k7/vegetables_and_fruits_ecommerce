"use client";

import React, {
  useEffect,
  useState,
} from "react";

import OrderModal from "../../../component/OrderModal/OrderModal.jsx";

import "./CartPage.css";
import { useRouter } from "next/navigation"
import { checkAuth } from "@/utils/checkAuth";
export default function CartPage() {
  useEffect(() => {

    const script =
      document.createElement("script");

    script.src =
      "https://checkout.razorpay.com/v1/checkout.js";

    script.async = true;

    document.body.appendChild(script);

  }, []);
  const handlePayment = async () => {

    try {

      const response =
        await axios.post(
          "http://localhost:5000/api/payment/create-order",
          {
            amount: total
          }
        );

      const order =
        response.data.order;

      const options = {

        key:
          "YOUR_RAZORPAY_KEY",

        amount:
          order.amount,

        currency:
          order.currency,

        name:
          "Fresh Store",

        description:
          "Order Payment",

        order_id:
          order.id,

        handler: async function (response) {

          alert(
            "Payment Successful"
          );

          console.log(response);

        },

        theme: {
          color: "#16a34a",
        },

      };

      const razorpay =
        new window.Razorpay(options);

      razorpay.open();

    } catch (error) {

      console.log(error);

    }

  };
  const router =
    useRouter();

  useEffect(() => {

    checkAuth(router);

  }, []);

  const [isModalOpen,
    setIsModalOpen] =
    useState(false);

  const [cartItems,
    setCartItems] =
    useState([]);

  /* ===== LOAD CART ===== */

  useEffect(() => {

    const savedCart =
      JSON.parse(
        localStorage.getItem("cart")
      ) || [];

    setCartItems(savedCart);

  }, []);

  /* ===== SAVE CART ===== */

  useEffect(() => {

    localStorage.setItem(
      "cart",
      JSON.stringify(cartItems)
    );

  }, [cartItems]);

  /* ===== UPDATE QUANTITY ===== */

  const updateQuantity = (
    id,
    amount
  ) => {

    const updatedCart =
      cartItems.map((item) => {

        if (item._id === id) {

          return {
            ...item,
            quantity:
              Math.max(
                1,
                item.quantity + amount
              ),
          };

        }

        return item;

      });

    setCartItems(updatedCart);

  };

  /* ===== REMOVE ITEM ===== */

  const removeItem = (id) => {

    const updatedCart =
      cartItems.filter(
        (item) => item._id !== id
      );

    setCartItems(updatedCart);

  };

  /* ===== TOTALS ===== */

  const subtotal =
    cartItems.reduce(
      (acc, item) =>
        acc +
        item.price * item.quantity,
      0
    );

  const shipping =
    subtotal > 50 || subtotal === 0
      ? 0
      : 5.99;

  const total =
    subtotal + shipping;

  return (
    <div className="cart-page-container animate-fade">

      <h1 className="cart-page-title">
        Your Shopping Cart
      </h1>

      {cartItems.length === 0 ? (

        <div className="empty-cart-state">

          <h2>
            Your cart is empty
          </h2>

        </div>

      ) : (

        <div className="cart-layout-grid">

          {/* LEFT */}

          <div className="cart-items-section">

            {cartItems.map(
              (item) => (

                <div
                  key={item._id}
                  className="cart-item-row"
                >

                  <div className="cart-item-product">

                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      width="80"
                    />

                    <div>

                      <h3>
                        {item.title}
                      </h3>

                      <p>
                        ₹{item.price}
                      </p>

                    </div>

                  </div>

                  <div className="quantity-stepper">

                    <button
                      onClick={() =>
                        updateQuantity(
                          item._id,
                          -1
                        )
                      }
                    >
                      −
                    </button>

                    <span className="qty-display">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() =>
                        updateQuantity(
                          item._id,
                          1
                        )
                      }
                    >
                      +
                    </button>

                  </div>

                  <button
                    className="delete-item-btn"
                    onClick={() =>
                      removeItem(
                        item._id
                      )
                    }
                  >
                    ✕
                  </button>

                </div>

              )
            )}

          </div>

          {/* RIGHT */}

          <div className="cart-summary-section">

            <h2 className="summary-title">
              Order Summary
            </h2>

            <div className="summary-rows">

              <div className="summary-row">

                <span>
                  Subtotal
                </span>

                <span>
                  ₹
                  {subtotal.toFixed(
                    2
                  )}
                </span>

              </div>

              <div className="summary-row">

                <span>
                  Shipping
                </span>

                <span>
                  {shipping === 0
                    ? "FREE"
                    : `₹${shipping.toFixed(
                      2
                    )}`}
                </span>

              </div>

              <hr />

              <div className="summary-row total-row">

                <span>
                  Total
                </span>

                <span>
                  ₹
                  {total.toFixed(
                    2
                  )}
                </span>

              </div>

            </div>

            <button
              className="checkout-submit-btn"
              onClick={() =>
                setIsModalOpen(true)
              }
            >
              Proceed to Checkout →
            </button>

          </div>

        </div>

      )}

      <OrderModal
        isOpen={isModalOpen}
        onClose={() =>
          setIsModalOpen(false)
        }
        cartItems={cartItems}
        subtotal={total}
      />

    </div>
  );
}