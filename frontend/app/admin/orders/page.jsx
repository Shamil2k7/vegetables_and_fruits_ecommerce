"use client";

import React, {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import "../AdminDashboard.css";
import './order.css'
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
     FETCH ALL ORDERS
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
          response.data.orders
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
     UPDATE STATUS
  ========================= */

  const handleStatusChange =
    async (
      orderId,
      newStatus
    ) => {

      try {

        await axios.put(
          `${API_URL}/order/${orderId}/status`,
          {
            status:
              newStatus,
          }
        );

        setOrders((prev) =>
          prev.map((order) =>

            order._id === orderId

              ? {
                  ...order,
                  status:
                    newStatus,
                }

              : order
          )
        );

      } catch (error) {

        console.log(error);

        alert(
          "Failed to update order"
        );

      }

    };

  /* =========================
     TOTAL REVENUE
  ========================= */

  const totalRevenue =
    orders.reduce(
      (acc, order) =>
        acc +
        order.totalPrice,
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
        order.status ===
        "Pending"
    ).length;

  return (

    <div className="admin-dashboard-container">

      <main className="admin-main-viewport">

        {/* =========================
            TOP HEADER
        ========================= */}

        <header className="admin-top-bar">

          <h2>
            Admin Dashboard
          </h2>

        </header>

        {/* =========================
            METRICS
        ========================= */}

        <div className="admin-metrics-grid">

          <div className="adm-card">

            <h3>
              Total Revenue
            </h3>

            <p>
              ₹
              {totalRevenue.toFixed(
                2
              )}
            </p>

          </div>

          <div className="adm-card">

            <h3>
              Total Orders
            </h3>

            <p>
              {totalOrders}
            </p>

          </div>

          <div className="adm-card">

            <h3>
              Pending Orders
            </h3>

            <p>
              {pendingOrders}
            </p>

          </div>

        </div>

        {/* =========================
            ORDER TABLE
        ========================= */}

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
                      Email
                    </th>

                    <th>
                      Items
                    </th>

                    <th>
                      Amount
                    </th>

                    <th>
                      Payment
                    </th>

                    <th>
                      Status
                    </th>

                    <th>
                      Address
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
                        key={
                          order._id
                        }
                      >

                        {/* ORDER ID */}

                        <td>

                          {order._id.slice(
                            -6
                          )}

                        </td>

                        {/* USER */}

                        <td>

                          {
                            order
                              .userId
                              ?.name
                          }

                        </td>

                        {/* EMAIL */}

                        <td>

                          {
                            order
                              .userId
                              ?.email
                          }

                        </td>

                        {/* ITEMS */}

                        <td>

                          {order.items.map(
                            (
                              item,
                              index
                            ) => (

                              <div
                                key={
                                  index
                                }
                              >

                                {
                                  item.name
                                }

                                {" "}
                                x
                                {
                                  item.quantity
                                }

                              </div>

                            )
                          )}

                        </td>

                        {/* TOTAL */}

                        <td>

                          ₹
                          {order.totalPrice.toFixed(
                            2
                          )}

                        </td>

                        {/* PAYMENT */}

                        <td>

                          <span
                            className={`payment-status ${order.paymentStatus?.toLowerCase()}`}
                          >

                            {
                              order.paymentStatus
                            }

                          </span>

                        </td>

                        {/* STATUS */}

                        <td>

                          <span
                            className={`status-pill ${order.status.toLowerCase()}`}
                          >

                            {
                              order.status
                            }

                          </span>

                        </td>

                        {/* ADDRESS */}

                        <td>

                          {
                            order
                              .shippingAddress
                              ?.street
                          }

                          ,

                          {" "}

                          {
                            order
                              .shippingAddress
                              ?.city
                          }

                          ,

                          {" "}

                          {
                            order
                              .shippingAddress
                              ?.state
                          }

                        </td>

                        {/* DATE */}

                        <td>

                          {new Date(
                            order.createdAt
                          ).toLocaleDateString()}

                        </td>

                        {/* ACTION */}

                        <td>

                          <select
                            value={
                              order.status
                            }
                            onChange={(
                              e
                            ) =>
                              handleStatusChange(
                                order._id,
                                e
                                  .target
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

      </main>

    </div>

  );

}