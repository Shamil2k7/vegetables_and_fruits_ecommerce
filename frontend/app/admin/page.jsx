"use client";

import React, {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import "./AdminDashboard.css";

const API_URL =
  "http://localhost:5000/api";

export default function AdminDashboard() {

  

  const [orders, setOrders] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  /* =========================
     FETCH ORDERS
  ========================= */

  useEffect(() => {

    fetchOrders();

  }, []);

  const fetchOrders =
    async () => {

      try {

        setLoading(true);

        const response =
          await axios.get(
            `${API_URL}/order/admin/all`
          );

        setOrders(
          response.data.orders || []
        );

      } catch (error) {

        console.log(error);

        setError(
          "Failed to load orders"
        );

      } finally {

        setLoading(false);

      }

    };

  /* =========================
     UPDATE ORDER STATUS
  ========================= */

  const updateStatus =
    async (
      orderId,
      status
    ) => {

      try {

        await axios.put(
          `${API_URL}/order/${orderId}/status`,
          { status }
        );

        fetchOrders();

      } catch (error) {

        console.log(error);

        alert(
          "Status update failed"
        );

      }

    };

  /* =========================
     TOTAL REVENUE
  ========================= */

  const totalRevenue =
    orders.reduce(
      (acc, order) =>
        acc + order.totalPrice,
      0
    );

  /* =========================
     TOTAL ORDERS
  ========================= */

  const totalOrders =
    orders.length;

  /* =========================
     PENDING ORDERS
  ========================= */

  const pendingOrders =
    orders.filter(
      (order) =>
        order.status === "Pending"
    ).length;

  return (

    <div className="admin-dashboard-container">

      <main className="admin-main-viewport">

        {/* HEADER */}

        <header className="admin-top-bar">

          

          <div className="admin-profile-meta">

            

            <div className="admin-avatar">
              A
            </div>

            <span className="admin-name-text">
              Admin
            </span>

          </div>

        </header>

        {/* DASHBOARD */}

        <div className="admin-tab-view animate-fade">

          <div className="view-header">

            <h1>
              Admin Dashboard
            </h1>

            <p>
              Manage orders and store
              analytics
            </p>

          </div>

          {/* METRICS */}

          <div className="admin-metrics-grid">

            <div className="adm-card card-revenue">

              <div className="adm-card-info">

                <h3>
                  Total Revenue
                </h3>

                <p className="adm-card-value">
                  ₹
                  {totalRevenue.toFixed(2)}
                </p>

              </div>

              <span className="adm-card-icon-bg">
                💰
              </span>

            </div>

            <div className="adm-card card-orders">

              <div className="adm-card-info">

                <h3>
                  Total Orders
                </h3>

                <p className="adm-card-value">
                  {totalOrders}
                </p>

              </div>

              <span className="adm-card-icon-bg">
                📦
              </span>

            </div>

            <div className="adm-card card-products">

              <div className="adm-card-info">

                <h3>
                  Pending Orders
                </h3>

                <p className="adm-card-value">
                  {pendingOrders}
                </p>

              </div>

              <span className="adm-card-icon-bg">
                🚚
              </span>

            </div>

          </div>

          {/* ORDERS TABLE */}

          <div className="admin-table-section">

            <div className="table-section-header">

              <h3>
                All Orders
              </h3>

            </div>

            {loading ? (

              <h2>
                Loading...
              </h2>

            ) : error ? (

              <h2>
                {error}
              </h2>

            ) : (

              <div className="admin-table-wrapper">

                <table className="admin-data-table">

                  <thead>

                    <tr>

                      <th>
                        Order ID
                      </th>

                      <th>
                        Customer
                      </th>

                      <th>
                        Items
                      </th>

                      <th>
                        Total
                      </th>

                      <th>
                        Payment
                      </th>

                      <th>
                        Status
                      </th>

                      <th>
                        Date
                      </th>

                      <th>
                        Action
                      </th>

                    </tr>

                  </thead>

                  <tbody>

                    {orders.map(
                      (order) => (

                        <tr
                          key={order._id}
                        >

                          <td className="bold-row-txt">

                            {order._id.slice(
                              -6
                            )}

                          </td>

                          <td>

                            {
                              order.userId
                                ?.name
                            }

                          </td>

                          <td>

                            {
                              order.totalItems
                            }

                          </td>

                          <td className="bold-row-txt">

                            ₹
                            {order.totalPrice.toFixed(
                              2
                            )}

                          </td>

                          <td>

                            <span
                              className={`status-pill ${order.paymentStatus?.toLowerCase()}`}
                            >

                              {
                                order.paymentStatus
                              }

                            </span>

                          </td>

                          <td>

                            <span
                              className={`status-pill ${order.status.toLowerCase()}`}
                            >

                              {
                                order.status
                              }

                            </span>

                          </td>

                          <td>

                            {new Date(
                              order.createdAt
                            ).toLocaleDateString()}

                          </td>

                          <td>

                            <select
                              value={
                                order.status
                              }
                              onChange={(
                                e
                              ) =>
                                updateStatus(
                                  order._id,
                                  e.target
                                    .value
                                )
                              }
                              className="status-select"
                            >

                              <option value="Pending">
                                Pending
                              </option>

                              <option value="Processing">
                                Processing
                              </option>

                              <option value="Shipped">
                                Shipped
                              </option>

                              <option value="Delivered">
                                Delivered
                              </option>

                              <option value="Cancelled">
                                Cancelled
                              </option>

                            </select>

                          </td>

                        </tr>

                      )
                    )}

                  </tbody>

                </table>

              </div>

            )}

          </div>

        </div>

      </main>

    </div>

  );

}