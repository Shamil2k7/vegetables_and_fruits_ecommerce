"use client";
import './Footer.css';

export default function Footer() {
    return (
        <footer className="main-footer">
            <div className="footer-container">

                {/* Column 1: Brand Info & Contact */}
                <div className="footer-column brand-info">
                    <div className="footer-logo">
                        <span className="logo-main">organi</span>
                        <span className="logo-sub">FRESH PRODUCT</span>
                    </div>
                    <ul className="contact-details">
                        <li><strong>Address:</strong> 60-49 Road 11370 New York</li>
                        <li><strong>Phone:</strong> +65 11.188.888</li>
                        <li><strong>Email:</strong> hello@organi.com</li>
                    </ul>
                </div>

                {/* Column 2: Useful Directories */}
                <div className="footer-column Links-column">
                    <h3>Useful Links</h3>
                    <div className="links-split-grid">
                        <div className="links-group">
                            <a href="#about">About Us</a>
                            <a href="#shop">About Our Shop</a>
                            <a href="#secure">Secure Shopping</a>
                            <a href="#delivery">Delivery Information</a>
                            <a href="#privacy">Privacy Policy</a>
                            <a href="#sitemap">Our Sitemap</a>
                        </div>
                        <div className="links-group">
                            <a href="#projects">Who We Are</a>
                            <a href="#services">Our Services</a>
                            <a href="#projects">Projects</a>
                            <a href="#contact">Contact</a>
                            <a href="#innovation">Innovation</a>
                            <a href="#testimonials">Testimonials</a>
                        </div>
                    </div>
                </div>

                {/* Column 3: Newsletter SignUp Form */}
                <div className="footer-column newsletter-column">
                    <h3>Join Our Newsletter Now</h3>
                    <p>Get E-mail updates about our latest shop and special offers.</p>
                    <form className="footer-newsletter-form" onSubmit={(e) => e.preventDefault()}>
                        <input
                            type="email"
                            placeholder="Enter your mail"
                            className="newsletter-input"
                            required
                        />
                        <button type="submit" className="newsletter-submit-btn">Subscribe</button>
                    </form>

                    {/* Social Utility Media Handles */}
                    <div className="footer-socials">
                        <a href="#facebook" aria-label="Facebook" className="social-icon">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" /></svg>
                        </a>
                        <a href="#instagram" aria-label="Instagram" className="social-icon">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                        </a>
                        <a href="#twitter" aria-label="Twitter" className="social-icon">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" /></svg>
                        </a>
                        <a href="#pinterest" aria-label="Pinterest" className="social-icon">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.627 0-12 5.373-12 12 0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146 1.124.347 2.317.535 3.554.535 6.627 0 12-5.373 12-12 0-6.627-5.373-12-12-12z" /></svg>
                        </a>
                    </div>
                </div>

            </div>

            {/* --- REAR BASE SUB-FOOTER BAR --- */}
            <div className="footer-bottom-bar">
                <div className="bottom-bar-container">
                    <p className="copyright-text">
                        Copyright ©{new Date().getFullYear()} All rights reserved | This template is crafted with 💚 by Organi.
                    </p>
                    <div className="payment-badges-row">
                        <img src="https://via.placeholder.com/40x25?text=Visa" alt="Visa Card" />
                        <img src="https://via.placeholder.com/40x25?text=MC" alt="MasterCard" />
                        <img src="https://via.placeholder.com/40x25?text=PP" alt="PayPal" />
                        <img src="https://via.placeholder.com/40x25?text=Amex" alt="American Express" />
                    </div>
                </div>
            </div>
        </footer>
    );
}