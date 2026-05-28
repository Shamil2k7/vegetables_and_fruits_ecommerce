"use client";

import React, {
    useEffect,
    useState,
} from "react";

import axios from "axios";

import {
    useParams,
} from "next/navigation";

import "../ProductDetails.css";

const API_BASE_URL =
    "http://localhost:5000/api/product";

export default function ProductDetails() {

    const params = useParams();

    const { id } = params;

    const [product, setProduct] =
        useState(null);

    const [quantity, setQuantity] =
        useState(1);

    const fetchProduct = async () => {
        try {

            const response = await axios.get(
                `${API_BASE_URL}/productdetails/${id}`
            );

            if (response.data.success) {
                setProduct(response.data.data);
            }

        } catch (error) {
            console.log(error.response?.data || error.message);
        }
    };

    useEffect(() => {

        if (id) {
            fetchProduct();
        }

    }, [id]);

    const handleIncrement = () =>
        setQuantity((prev) => prev + 1);

    const handleDecrement = () =>
        setQuantity((prev) =>
            prev > 1 ? prev - 1 : 1
        );

    if (!product) {
        return <h1>Loading...</h1>;
    }
    const addToCart = () => {

        /* ===== CHECK LOGIN ===== */

        const token =
            localStorage.getItem("token");

        if (!token) {

            alert(
                "Please login first"
            );

            window.location.href =
                "/login";

            return;

        }

        /* ===== GET EXISTING CART ===== */

        const existingCart =
            JSON.parse(
                localStorage.getItem("cart")
            ) || [];

        /* ===== CHECK PRODUCT EXISTS ===== */

        const existingProduct =
            existingCart.find(
                (item) =>
                    item._id === product._id
            );

        if (existingProduct) {

            existingProduct.quantity +=
                quantity;

        } else {

            existingCart.push({
                ...product,
                quantity,
            });

        }

        /* ===== SAVE CART ===== */

        localStorage.setItem(
            "cart",
            JSON.stringify(existingCart)
        );

        alert(
            "Product added to cart"
        );

    };

    return (
        <div className="product-details-container">

            <main className="details-content-wrapper">

                <div className="details-image-section">

                    <div className="circular-bg-frame">

                        <img
                            src={product.imageUrl}
                            alt={product.title}
                            className="main-product-image"
                        />

                    </div>

                </div>

                <div className="details-info-section">

                    <div className="rating-category-row">

                        <div className="stars-wrapper">

                            {Array.from(
                                { length: 5 },
                                (_, i) => (
                                    <span
                                        key={i}
                                        className={`star-icon ${i <
                                            Math.floor(
                                                product.rating
                                            )
                                            ? "filled"
                                            : ""
                                            }`}
                                    >
                                        ★
                                    </span>
                                )
                            )}

                        </div>

                        <span className="category-pill">
                            {product.category}
                        </span>

                    </div>

                    <h1 className="main-product-title">
                        {product.title}
                    </h1>

                    <p className="product-description-text">
                        {product.description}
                    </p>

                    <div className="price-box">

                        <h2>
                            ₹{product.price}
                        </h2>

                        {product.oldPrice > 0 && (
                            <span>
                                ₹{product.oldPrice}
                            </span>
                        )}

                    </div>

                    <div className="purchase-actions-row">

                        <div className="quantity-stepper-container">

                            <button
                                className="step-btn"
                                onClick={handleDecrement}
                            >
                                −
                            </button>

                            <span className="quantity-value-display">
                                {quantity}
                            </span>

                            <button
                                className="step-btn"
                                onClick={handleIncrement}
                            >
                                +
                            </button>

                        </div>

                        <button
                            className="order-submit-btn"
                            onClick={addToCart}
                        >
                            Add to cart →
                        </button>

                    </div>

                </div>

            </main>

        </div>
    );
}