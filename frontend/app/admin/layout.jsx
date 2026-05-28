"use client";

import { usePathname } from "next/navigation";
import "./AdminDashboard.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { checkAdmin } from "@/utils/checkAdmin";

export default function LayoutWrapper({
  children,
}) {

  const pathname =
    usePathname();

  const router =
    useRouter();

  const [pendingOrders,
    setPendingOrders] =
    useState(0);

  /* =========================
     CHECK ADMIN
  ========================= */


  useEffect(() => {

    checkAdmin(router);

  }, [router]);
  

  /* =========================
     GET PENDING ORDERS COUNT
  ========================= */

  useEffect(() => {

    fetchPendingOrders();

  }, []);

  const fetchPendingOrders =
    async () => {

      try {

        const response =
          await axios.get(
            "http://localhost:5000/api/order/admin/all"
          );

        if (
          response.data.success
        ) {

          const pending =
            response.data.orders.filter(
              (order) =>
                order.status ===
                "Pending"
            );

          setPendingOrders(
            pending.length
          );

        }

      } catch (error) {

        console.log(
          "Failed to fetch order count",
          error
        );

      }

    };

  return (

    <html>

      <body>

        <div className="wraper">

          {/* SIDEBAR */}

          <aside className="admin-sidebar">

            <div className="admin-brand-section">

              <span className="brand-logo-main">
                organi
              </span>

              <span className="brand-role-tag">
                Admin Panel
              </span>

            </div>

            <nav className="admin-nav-menu">

              {/* DASHBOARD */}

              <button
                className={
                  pathname === "/admin"
                    ? "admin-nav-item active"
                    : "admin-nav-item"
                }
                onClick={() =>
                  router.push("/admin")
                }
              >

                <span className="admin-nav-icon">
                  📊
                </span>

                Overview

              </button>

              {/* ORDERS */}

              <button
                className={
                  pathname ===
                  "/admin/orders"
                    ? "admin-nav-item active"
                    : "admin-nav-item"
                }
                onClick={() =>
                  router.push(
                    "/admin/orders"
                  )
                }
              >

                <span className="admin-nav-icon">
                  📦
                </span>

                Orders

                {pendingOrders > 0 && (

                  <span className="admin-count-badge">

                    {pendingOrders}

                  </span>

                )}

              </button>

              {/* PRODUCTS */}

              <button
                className={
                  pathname ===
                  "/admin/product"
                    ? "admin-nav-item active"
                    : "admin-nav-item"
                }
                onClick={() =>
                  router.push(
                    "/admin/product"
                  )
                }
              >

                <span className="admin-nav-icon">
                  🥦
                </span>

                Products

              </button>

              {/* CUSTOMERS */}

              <button className="admin-nav-item"
              onClick={() =>
                  router.push(
                    "/admin/user"
                  )
                }
              >

                <span className="admin-nav-icon">
                  👥
                </span>

                Customers

              </button>

              {/* ANALYTICS */}

              

              

              {/* LOGOUT */}

              <button
                className="admin-nav-item admin-logout-btn"
                onClick={() => {

                  localStorage.removeItem(
                    "token"
                  );

                  localStorage.removeItem(
                    "user"
                  );

                  router.push(
                    "/login"
                  );

                }}
              >

                <span className="admin-nav-icon">
                  🚪
                </span>

                Logout

              </button>

            </nav>

          </aside>

          {/* MAIN CONTENT */}

          <main className="admin-main-viewport">

            {children}

          </main>

        </div>

      </body>

    </html>

  );

}