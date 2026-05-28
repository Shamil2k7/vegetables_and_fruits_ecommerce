"use client";

import { useState, useEffect } from "react";
import axios from "axios";

import ProductCard from "../component/Productcart/ProductCard.jsx";
import EmailContact from "../component/EmailContact/EmailContact.jsx";

import "./globals.css";

const API_BASE_URL =
  "http://localhost:5000/api/product";

export default function Home() {

  const [products, setProducts] = useState([]);

  const [loading, setLoading] =
    useState(true);

  const [activeCategory, setActiveCategory] =
    useState("All");

  /* ================= FETCH PRODUCTS ================= */

  const fetchProducts = async () => {
    try {

      setLoading(true);

      const response = await axios.get(
        `${API_BASE_URL}/productlistshort`
      );

      if (response.data.success) {

        setProducts(response.data.data);

      }

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }
  };

  useEffect(() => {

    fetchProducts();

  }, []);

  /* ================= DYNAMIC CATEGORY ================= */

  const categories = [
    "All",
    ...new Set(
      products.map((item) => item.category)
    ),
  ];

  /* ================= FILTER PRODUCTS ================= */

  const filteredProducts =
    activeCategory === "All"
      ? products
      : products.filter(
          (product) =>
            product.category === activeCategory
        );

  return (
    <div className="hero-container">

      {/* ================= HERO SECTION ================= */}

      <section className="hero-body">

        <div className="hero-content">

          <div className="badge-wrapper">
            <span className="green-badge">
              100% ORGANIC FOODS
            </span>
          </div>

          <h1 className="hero-title">
            Organic Veggies & Foods <br />
            You Cook{" "}
            <span className="highlight-text">
              Healthy
            </span>
          </h1>

        </div>

        <div className="hero-image-container">

          <img
            src="/home_image.png"
            alt="Organic Food"
            className="hero-main-img"
          />

        </div>

      </section>

      {/* ================= PRODUCTS SECTION ================= */}

      <section className="products-section">

        <div className="section-header">

          <div className="header-title-area">

            <span className="sub-title">
              FRESH FROM OUR FARM
            </span>

            <h2 className="main-title">
              Our Organic Products
            </h2>

          </div>

          {/* ================= CATEGORY FILTER ================= */}

          <div className="category-tabs">

            {categories.map((cat) => (

              <button
                key={cat}
                className={`tab-btn ${
                  activeCategory === cat
                    ? "active"
                    : ""
                }`}
                onClick={() =>
                  setActiveCategory(cat)
                }
              >
                {cat}
              </button>

            ))}

          </div>

        </div>

        {/* ================= PRODUCTS GRID ================= */}

        {loading ? (

          <h2>Loading Products...</h2>

        ) : (

          <div className="products-grid">

            {filteredProducts.map((product) => (

              <ProductCard
                key={product._id}
                id={product._id}
                _id={product._id}
                category={product.category}
                discount={product.discount}
                imageUrl={product.imageUrl}
                title={product.title}
                rating={product.rating}
                price={product.price}
                oldPrice={product.oldPrice}
              />

            ))}

          </div>

        )}

        <button
          className="scroll-top-btn"
          aria-label="Scroll to top"
        >
          ↑
        </button>

      </section>

      {/* ================= ABOUT SECTION ================= */}

      <section className="about-section">

        <div className="about-container">

          <div className="about-image-side">

            <div className="image-frame-wrapper">

              <img
                src="https://i.pinimg.com/736x/56/0e/fa/560efa36c00b3f25ec8fab0fd58a13a9.jpg"
                alt="Fresh harvest"
                className="about-main-img"
              />

            </div>

          </div>

          <div className="about-text-side">

            <span className="about-label">
              ABOUT OUR SHOP
            </span>

            <h2 className="about-heading">
              Fresh From Our Farm Right To
              Your Doorstep
            </h2>

            <p className="about-lead-text">
              We believe that clean,
              nutrient-dense food shouldn't
              be a luxury.
            </p>

          </div>

        </div>

      </section>

      <EmailContact />

    </div>
  );
}