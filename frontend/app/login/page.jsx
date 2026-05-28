"use client";

import React, { useState } from "react";

import axios from "axios";

import { useRouter } from "next/navigation";

import "./login.css";

export default function LoginPage() {

  const router = useRouter();

  /* =========================
     STATE
  ========================= */

  const [isLogin, setIsLogin] =
    useState(true);

  const [loading, setLoading] =
    useState(false);

  const [formData, setFormData] =
    useState({

      name: "",

      email: "",

      password: "",

    });

  /* =========================
     HANDLE INPUT CHANGE
  ========================= */

  const handleChange = (e) => {

    const { name, value } =
      e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

  };

  /* =========================
     HANDLE SUBMIT
  ========================= */

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        setLoading(true);

        /* ================= LOGIN ================= */

        if (isLogin) {

          const response =
            await axios.post(

              "http://localhost:5000/api/auth/login",

              {
                email:
                  formData.email,

                password:
                  formData.password,
              }

            );

          console.log(response.data);

          /* ================= SAVE TOKEN ================= */

          localStorage.setItem(
            "token",
            response.data.token
          );

          /* ================= SAVE USER ================= */

          localStorage.setItem(

            "user",

            JSON.stringify(
              response.data.user
            )

          );

          alert(
            "Login Successful"
          );

          /* ================= REDIRECT ================= */

          if (
            response.data.user
              .isAdmin
          ) {

            router.push(
              "/admin"
            );

          } else {

            router.push(
              "/"
            );

          }

        }

        /* ================= SIGNUP ================= */

        else {

          const response =
            await axios.post(

              "http://localhost:5000/api/auth/singup",

              {

                name:
                  formData.name,

                email:
                  formData.email,

                password:
                  formData.password,

              }

            );

          alert(
            response.data.message
          );

          /* ===== SWITCH TO LOGIN ===== */

          setIsLogin(true);

          /* ===== CLEAR FORM ===== */

          setFormData({

            name: "",

            email: "",

            password: "",

          });

        }

      } catch (error) {

        console.log(error);

        alert(

          error.response?.data
            ?.message ||

          "Something went wrong"

        );

      } finally {

        setLoading(false);

      }

    };

  return (

    <div className="login-page-wrapper">

      <div className="login-card">

        {/* ================= LEFT SIDE ================= */}

        <div className="login-left">

          <h1>
            Fresh Organic
          </h1>

          <p>

            Buy fresh vegetables,
            fruits and healthy
            organic products.

          </p>

          <img
            src="https://images.unsplash.com/photo-1542838132-92c53300491e"
            alt="Organic"
          />

        </div>

        {/* ================= RIGHT SIDE ================= */}

        <div className="login-right">

          <h2>

            {isLogin
              ? "Welcome Back"
              : "Create Account"}

          </h2>

          <p className="login-subtitle">

            {isLogin
              ? "Login to continue"
              : "Signup to start shopping"}

          </p>

          <form
            onSubmit={
              handleSubmit
            }
            className="login-form"
          >

            {/* ================= NAME ================= */}

            {!isLogin && (

              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={
                  formData.name
                }
                onChange={
                  handleChange
                }
                required
              />

            )}

            {/* ================= EMAIL ================= */}

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={
                formData.email
              }
              onChange={
                handleChange
              }
              required
            />

            {/* ================= PASSWORD ================= */}

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={
                formData.password
              }
              onChange={
                handleChange
              }
              required
            />

            {/* ================= BUTTON ================= */}

            <button
              type="submit"
              disabled={loading}
            >

              {loading
                ? isLogin
                  ? "Logging..."
                  : "Creating..."
                : isLogin
                ? "Login"
                : "Signup"}

            </button>

          </form>

          {/* ================= SWITCH ================= */}

          <div className="switch-auth">

            {isLogin
              ? "Don't have an account?"
              : "Already have an account?"}

            <span
              onClick={() =>
                setIsLogin(
                  !isLogin
                )
              }
            >

              {isLogin
                ? " Signup"
                : " Login"}

            </span>

          </div>

        </div>

      </div>

    </div>

  );

}