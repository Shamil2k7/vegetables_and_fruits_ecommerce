"use client";

import './ProductCard.css';
import { useRouter } from "next/navigation";

export default function ProductCard({
  _id,
  category,
  discount,
  imageUrl,
  title,
  rating,
  price,
  oldPrice
}) {

  const router = useRouter();

  // Helper to render stars
  const renderStars = (ratingValue) => {
    const totalStars = 5;
    const filledStars = Math.floor(ratingValue);

    return Array.from({ length: totalStars }, (_, index) => (
      <span
        key={index}
        className={`star ${index < filledStars ? 'filled' : 'empty'}`}
      >
        ★
      </span>
    ));
  };

  return (
    <div
      className="product-card"
      onClick={() => router.push(`/productdetails/${_id}`)}
      style={{ cursor: "pointer" }}
    >
      <div className="card-image-wrapper">

        <span className="card-category-badge">
          {category}
        </span>

        {discount && (
          <span className="card-discount-badge">
            -{discount}%
          </span>
        )}

        <img
          src={imageUrl}
          alt={title}
          className="product-img"
        />
      </div>

      <div className="card-info">

        <div className="rating-row">
          <div className="stars-container">
            {renderStars(rating)}
          </div>

          <span className="rating-text">
            ({rating?.toFixed(1)})
          </span>
        </div>

        <h3 className="product-title">
          {title}
        </h3>

        <div className="price-row">
          <span className="current-price">
            ₹{price?.toFixed(2)}
          </span>

          {oldPrice && (
            <span className="old-price">
              ₹{oldPrice?.toFixed(2)}
            </span>
          )}
        </div>

      </div>
    </div>
  );
}