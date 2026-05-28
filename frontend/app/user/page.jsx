"use client";

import React, {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import "./UserProfile.css";

const API_URL =
  "http://localhost:5000/api";

export default function UserProfile() {

  /* =========================
     DEFAULT OPEN ORDERS
  ========================= */

  const [activeTab, setActiveTab] =
    useState("orders");

  const [user, setUser] =
    useState(null);

  const [orders, setOrders] =
    useState([]);

  const [loadingOrders,
    setLoadingOrders] =
    useState(false);

  const [formData, setFormData] =
    useState({

      firstName: "",

      lastName: "",

      email: "",

      phone: "",

      address: "",

      city: "",

      zipCode: "",

    });

  /* =========================
     CHECK LOGIN
  ========================= */

  useEffect(() => {

    const token =
      localStorage.getItem("token");

    const savedUser =
      JSON.parse(
        localStorage.getItem("user")
      );

    if (!token || !savedUser) {

      window.location.href =
        "/login";

      return;

    }

    setUser(savedUser);

    const fullName =
      savedUser.name?.split(" ") || [];

    setFormData({

      firstName:
        fullName[0] || "",

      lastName:
        fullName
          .slice(1)
          .join(" ") || "",

      email:
        savedUser.email || "",

      phone:
        savedUser.phone || "",

      address:
        savedUser.address || "",

      city:
        savedUser.city || "",

      zipCode:
        savedUser.zipCode || "",

    });

    fetchOrders(
      savedUser.id
    );

  }, []);

  /* =========================
     FETCH ORDERS
  ========================= */

  const fetchOrders =
    async (userId) => {

      try {

        setLoadingOrders(true);

        const response =
          await axios.get(
            `${API_URL}/order/user/${userId}`
          );

        setOrders(
          response.data.orders || []
        );

      } catch (error) {

        console.log(error);

      } finally {

        setLoadingOrders(false);

      }

    };

  /* =========================
     INPUT CHANGE
  ========================= */

  const handleInputChange =
    (e) => {

      const { name, value } =
        e.target;

      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));

    };

  /* =========================
     UPDATE PROFILE
  ========================= */

  const handleFormSubmit =
    async (e) => {

      e.preventDefault();

      try {

        const response =
          await axios.put(
            `${API_URL}/auth/profile/${user.id}`,
            formData
          );

        if (
          response.data.success
        ) {

          alert(
            "Profile updated"
          );

          localStorage.setItem(
            "user",
            JSON.stringify(
              response.data.user
            )
          );

          setUser(
            response.data.user
          );

        }

      } catch (error) {

        console.log(error);

        alert(
          "Profile update failed"
        );

      }

    };

  /* =========================
     CANCEL ORDER
  ========================= */

  const handleCancelOrder =
    async (orderId) => {

      try {

        const response =
          await axios.put(
            `${API_URL}/order/${orderId}/cancel`
          );

        if (
          response.data.success
        ) {

          alert(
            "Order cancelled"
          );

          fetchOrders(
            user.id
          );

        }

      } catch (error) {

        console.log(error);

        alert(
          error.response?.data
            ?.message ||
            "Cancel failed"
        );

      }

    };

  /* =========================
     LOGOUT
  ========================= */

  const handleLogout = () => {

    localStorage.removeItem(
      "token"
    );

    localStorage.removeItem(
      "user"
    );

    localStorage.removeItem(
      "cart"
    );

    window.location.href =
      "/login";

  };

  return (

    <div className="profile-page-container">

      {/* ================= SIDEBAR ================= */}

      <aside className="profile-sidebar">

        <div className="user-avatar-section">

          <div className="avatar-wrapper">

            

          </div>

          <h2 className="user-display-name">

            {formData.firstName}{" "}
            {formData.lastName}

          </h2>

        </div>

        <nav className="sidebar-nav-menu">

          <button
            className={`sidebar-nav-item ${
              activeTab ===
              "profile"
                ? "active"
                : ""
            }`}
            onClick={() =>
              setActiveTab(
                "profile"
              )
            }
          >
            Profile
          </button>

          <button
            className={`sidebar-nav-item ${
              activeTab ===
              "orders"
                ? "active"
                : ""
            }`}
            onClick={() =>
              setActiveTab(
                "orders"
              )
            }
          >
            Orders
          </button>

          <button
            className="sidebar-nav-item logout-btn"
            onClick={
              handleLogout
            }
          >
            Logout
          </button>

        </nav>

      </aside>

      {/* ================= MAIN ================= */}

      <main className="profile-main-content">

        {/* ================= PROFILE ================= */}

        {activeTab ===
          "profile" && (

          <form
            onSubmit={
              handleFormSubmit
            }
            className="profile-edit-form"
          >

            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={
                formData.firstName
              }
              onChange={
                handleInputChange
              }
            />

            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={
                formData.lastName
              }
              onChange={
                handleInputChange
              }
            />

            <input
              type="text"
              name="phone"
              placeholder="Phone"
              value={
                formData.phone
              }
              onChange={
                handleInputChange
              }
            />

            <input
              type="text"
              name="address"
              placeholder="Address"
              value={
                formData.address
              }
              onChange={
                handleInputChange
              }
            />

            <input
              type="text"
              name="city"
              placeholder="City"
              value={
                formData.city
              }
              onChange={
                handleInputChange
              }
            />

            <input
              type="text"
              name="zipCode"
              placeholder="Zip Code"
              value={
                formData.zipCode
              }
              onChange={
                handleInputChange
              }
            />

            <button
              type="submit"
            >
              Save Changes
            </button>

          </form>

        )}

        {/* ================= ORDERS ================= */}

        {activeTab ===
          "orders" && (

          <div>

            <h2>
              My Orders
            </h2>

            {loadingOrders ? (

              <p>
                Loading...
              </p>

            ) : orders.length === 0 ? (

              <p>
                No orders found
              </p>

            ) : (

              orders.map(
                (order) => (

                  <div
                    key={order._id}
                    className="order-card"
                  >

                    <h3>
                      Order ID:
                      {" "}
                      {order._id}
                    </h3>

                    <p>
                      Status:
                      {" "}
                      {order.status}
                    </p>

                    <p>
                      Total:
                      ₹
                      {
                        order.totalPrice
                      }
                    </p>

                    <div>

                      {order.items.map(
                        (item, idx) => (

                          <div
                            key={idx}
                          >

                            {item.name}
                            {" "}
                            x
                            {
                              item.quantity
                            }

                          </div>

                        )
                      )}

                    </div>

                    {order.status !==
                      "Cancelled" &&
                      order.status !==
                        "Delivered" && (

                      <button
                        onClick={() =>
                          handleCancelOrder(
                            order._id
                          )
                        }
                      >
                        Cancel Order
                      </button>

                    )}

                  </div>

                )
              )

            )}

          </div>

        )}

      </main>

    </div>

  );

}