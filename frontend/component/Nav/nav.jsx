"use client";

import {
  useEffect,
  useState,
} from "react";

import "./Navbar.css";

export default function Navbar() {

  const [
    isMobileMenuOpen,
    setIsMobileMenuOpen,
  ] = useState(false);

  const [
    cartCount,
    setCartCount,
  ] = useState(0);

  /* ===== MOBILE MENU ===== */

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(
      !isMobileMenuOpen
    );
  };

  /* ===== LOAD CART COUNT ===== */

  useEffect(() => {

    const updateCartCount =
      () => {

        const cart =
          JSON.parse(
            localStorage.getItem(
              "cart"
            )
          ) || [];

        const totalQty =
          cart.reduce(
            (acc, item) =>
              acc + item.quantity,
            0
          );

        setCartCount(totalQty);

      };

    updateCartCount();

    window.addEventListener(
      "storage",
      updateCartCount
    );

    return () => {

      window.removeEventListener(
        "storage",
        updateCartCount
      );

    };

  }, []);

  return (
    <>

      <header className="navbar">

        {/* LOGO */}

        <div className="nav-logo">

          <svg
            className="logo-svg"
            width="36"
            height="36"
            viewBox="0 0 24 24"
            fill="none"
          >

            <path
              d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 17H11V15H13V17ZM13 13H11V7H13V13Z"
              fill="#7fad39"
            />

          </svg>

          <div className="logo-text">

            <span className="logo-title">
              organi
            </span>

            <span className="logo-subtitle">
              FRESH PRODUCT
            </span>

          </div>

        </div>

        {/* NAVIGATION */}

        <nav
          className={`nav-menu ${
            isMobileMenuOpen
              ? "active"
              : ""
          }`}
        >

          <a
            href="/"
            className="nav-item active"
            onClick={() =>
              setIsMobileMenuOpen(
                false
              )
            }
          >
            Home
          </a>

          <a
            href="/productlist"
            className="nav-item"
            onClick={() =>
              setIsMobileMenuOpen(
                false
              )
            }
          >
            Shop
          </a>

          <a
            href="/#contact"
            className="nav-item"
            onClick={() =>
              setIsMobileMenuOpen(
                false
              )
            }
          >
            Contacts
          </a>

        </nav>

        {/* ACTIONS */}

        <div className="nav-actions">

          {/* PROFILE */}

          <button
            className="action-btn profile-btn"
            aria-label="Profile"
            onClick={() =>
              (window.location.href =
                "/user")
            }
          >

            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >

              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>

              <circle
                cx="12"
                cy="7"
                r="4"
              ></circle>

            </svg>

          </button>

          {/* CART */}

          <button
            className="action-btn cart-btn"
            aria-label="Cart"
            onClick={() =>
              (window.location.href =
                "/user/cart")
            }
          >

            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >

              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>

              <line
                x1="3"
                y1="6"
                x2="21"
                y2="6"
              ></line>

              <path d="M16 10a4 4 0 0 1-8 0"></path>

            </svg>

            <span className="cart-badge">
              {cartCount}
            </span>

          </button>

          {/* MOBILE MENU */}

          <button
            className="mobile-toggle-btn"
            onClick={
              toggleMobileMenu
            }
            aria-label="Toggle Menu"
          >

            <span
              className={`bar ${
                isMobileMenuOpen
                  ? "open"
                  : ""
              }`}
            ></span>

            <span
              className={`bar ${
                isMobileMenuOpen
                  ? "open"
                  : ""
              }`}
            ></span>

            <span
              className={`bar ${
                isMobileMenuOpen
                  ? "open"
                  : ""
              }`}
            ></span>

          </button>

        </div>

      </header>

      {/* BACKDROP */}

      {isMobileMenuOpen && (

        <div
          className="menu-backdrop"
          onClick={
            toggleMobileMenu
          }
        ></div>

      )}

    </>
  );
}