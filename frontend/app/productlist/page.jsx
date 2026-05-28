"use client";

import React, {
  useEffect,
  useMemo,
  useState,
} from "react";

import axios from "axios";

import ProductCard from "../../component/Productcart/ProductCard.jsx";

import "./ProductList.css";

const API_URL =
  "http://localhost:5000/api/product/productlist";

export default function ProductList() {

  const [products, setProducts] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [activeCategory,
    setActiveCategory] =
    useState("All");

  const [priceRange,
    setPriceRange] =
    useState(5000);

  const [sortType,
    setSortType] =
    useState("");

  /* =========================
     FETCH PRODUCTS
  ========================= */

  useEffect(() => {

    fetchProducts();

  }, []);

  const fetchProducts =
    async () => {

      try {

        setLoading(true);

        const response =
          await axios.get(
            API_URL
          );

        if (
          response.data.success
        ) {

          setProducts(
            response.data.data
          );

        }

      } catch (error) {

        console.log(
          "Fetch Product Error:",
          error
        );

      } finally {

        setLoading(false);

      }

    };

  /* =========================
     DYNAMIC CATEGORY
  ========================= */

  const categories =
    useMemo(() => {

      const uniqueCategories =
        [
          ...new Set(
            products.map(
              (product) =>
                product.category
            )
          ),
        ];

      return [
        "All",
        ...uniqueCategories,
      ];

    }, [products]);

  /* =========================
     FILTER + SORT
  ========================= */

  const filteredProducts =
    [...products]

      .filter((product) => {

        const matchCategory =

          activeCategory ===
          "All" ||

          product.category ===
          activeCategory;

        const matchPrice =

          product.price <=
          priceRange;

        return (
          matchCategory &&
          matchPrice
        );

      })

      .sort((a, b) => {

        if (
          sortType ===
          "lowToHigh"
        ) {

          return (
            a.price - b.price
          );

        }

        if (
          sortType ===
          "highToLow"
        ) {

          return (
            b.price - a.price
          );

        }

        return 0;

      });

  return (

    <section className="products-section">

      {/* =========================
          HEADER
      ========================= */}

      <div className="section-header">

        <div className="header-title-area">

          <span className="sub-title">
            FRESH FROM OUR FARM
          </span>

          <h2 className="main-title">
            Our Organic Products
          </h2>

        </div>

      </div>

      {/* =========================
          FILTER SECTION
      ========================= */}

      <div className="filter-wrapper">

        {/* CATEGORY FILTER */}

        <div className="category-tabs">

          {categories.map(
            (category) => (

              <button
                key={category}
                className={`tab-btn ${
                  activeCategory ===
                  category
                    ? "active"
                    : ""
                }`}
                onClick={() =>
                  setActiveCategory(
                    category
                  )
                }
              >

                {category}

              </button>

            )
          )}

          {/* SORT */}

          <div className="sort-filter-box">

            <select
              value={sortType}
              onChange={(e) =>
                setSortType(
                  e.target.value
                )
              }
              className="sort-select"
            >

              <option value="">
                Default
              </option>

              <option value="lowToHigh">
                Price: Low to High
              </option>

              <option value="highToLow">
                Price: High to Low
              </option>

            </select>

          </div>

        </div>

      </div>

      {/* =========================
          PRODUCT GRID
      ========================= */}

      {loading ? (

        <div className="loading-box">

          Loading Products...

        </div>

      ) : filteredProducts.length === 0 ? (

        <div className="no-products">

          No Products Found

        </div>

      ) : (

        <div className="products-grid">

          {filteredProducts.map(
            (product) => (

              <ProductCard
                key={product._id}

                id={product._id}

                _id={product._id}

                category={
                  product.category
                }

                discount={
                  product.discount
                }

                imageUrl={
                  product.imageUrl
                }

                title={
                  product.title
                }

                rating={
                  product.rating
                }

                price={
                  product.price
                }

                oldPrice={
                  product.oldPrice
                }

                type={
                  product.category
                }
              />

            )
          )}

        </div>

      )}

      {/* =========================
          SCROLL TOP BUTTON
      ========================= */}

      <button
        className="scroll-top-btn"
        onClick={() =>
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          })
        }
      >
        ↑
      </button>

    </section>

  );

}