"use client";

import React, { useState } from 'react';
import './EmailContact.css';

export default function EmailContact() {
  const [emailData, setEmailData] = useState({
    subject: '',
    email: '',
    message: ''
  });
  const [isSent, setIsSent] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmailData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log("Email Payload Data:", emailData);
    
    // Simulate API dispatch successfully 
    setIsSent(true);
    setTimeout(() => {
      setIsSent(false);
      setEmailData({ subject: '', email: '', message: '' });
    }, 3000);
  };

  return (
    <div className="email-form-container" id='contact'>
      <div className="email-form-card">
        <div className="email-form-header">
          <h2>Send an Email</h2>
          <p>Reach out directly and we will get back to you shortly.</p>
        </div>

        {isSent && (
          <div className="success-banner animate-pop">
            🌿 Email dispatched successfully!
          </div>
        )}

        <form onSubmit={handleFormSubmit} className="standard-email-form">
          <div className="email-field-group">
            <label htmlFor="user-email">Your Email Address</label>
            <input 
              type="email" 
              id="user-email"
              name="email"
              value={emailData.email}
              onChange={handleChange}
              placeholder="name@example.com" 
              required 
            />
          </div>

          <div className="email-field-group">
            <label htmlFor="email-subject">Subject</label>
            <input 
              type="text" 
              id="email-subject"
              name="subject"
              value={emailData.subject}
              onChange={handleChange}
              placeholder="How can we help you?" 
              required 
            />
          </div>

          <div className="email-field-group">
            <label htmlFor="email-message">Message</label>
            <textarea 
              id="email-message"
              name="message"
              rows="6"
              value={emailData.message}
              onChange={handleChange}
              placeholder="Write your message here..." 
              required
            ></textarea>
          </div>

          <button type="submit" className="email-submit-btn">
            Send Email
          </button>
        </form>
      </div>
    </div>
  );
}