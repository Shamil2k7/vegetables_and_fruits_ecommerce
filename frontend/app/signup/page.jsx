"use client";

import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import Link from 'next/link';
import './auth.css';

const API_AUTH_URL = "http://localhost:5000/api/auth";

// Validation schema matching typical backend registration requirements
const SignUpSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Name must be at least 3 characters")
    .required("Full name is required"),
  email: Yup.string()
    .email("Invalid email address format")
    .required("Email address is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters long")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], "Passwords must match")
    .required("Please confirm your password")
});

export default function SignUpPage() {
  const handleSignUpSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const payload = {
        name: values.name,
        email: values.email,
        password: values.password
      };

      // Assuming your backend route for signup is '/register' or '/signup'
      const response = await axios.post(`${API_AUTH_URL}/singup`, payload);
      
      if (response.data.success || response.status === 201) {
        alert("Account created successfully! Please log in.");
        resetForm();
        window.location.href = "/login"; // Redirect to login page
      }
    } catch (error) {
      console.error("Signup failed:", error);
      alert(error.response?.data?.message || "An error occurred during registration.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="auth-container animate-fade">
      <div className="auth-card">
        <div className="auth-header">
          <h2>Create Account</h2>
          <p>Join us to get fresh items delivered straight to your door step.</p>
        </div>

        <Formik
          initialValues={{ name: '', email: '', password: '', confirmPassword: '' }}
          validationSchema={SignUpSchema}
          onSubmit={handleSignUpSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="auth-form">
              <div className="auth-field-group">
                <label>Full Name</label>
                <Field type="text" name="name" placeholder="John Doe" />
                <ErrorMessage name="name" component="span" className="auth-error" />
              </div>

              <div className="auth-field-group">
                <label>Email Address</label>
                <Field type="email" name="email" placeholder="example@email.com" />
                <ErrorMessage name="email" component="span" className="auth-error" />
              </div>

              <div className="auth-field-group">
                <label>Password</label>
                <Field type="password" name="password" placeholder="••••••••" />
                <ErrorMessage name="password" component="span" className="auth-error" />
              </div>

              <div className="auth-field-group">
                <label>Confirm Password</label>
                <Field type="password" name="confirmPassword" placeholder="••••••••" />
                <ErrorMessage name="confirmPassword" component="span" className="auth-error" />
              </div>

              <button type="submit" className="auth-btn" disabled={isSubmitting}>
                {isSubmitting ? "Creating Account..." : "Sign Up"}
              </button>
            </Form>
          )}
        </Formik>

        <div className="auth-footer">
          <p>Already have an account? <Link href="/login">Log In here</Link></p>
        </div>
      </div>
    </div>
  );
}