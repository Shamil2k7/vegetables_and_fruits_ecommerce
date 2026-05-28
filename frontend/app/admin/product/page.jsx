"use client";

import React, {
  useEffect,
  useState,
} from "react";

import {
  Formik,
  Form,
  Field,
  ErrorMessage,
} from "formik";

import * as Yup from "yup";

import axios from "axios";

import "./ProductsPage.css";
import "../AdminDashboard.css";

const API_BASE_URL =
  "http://localhost:5000/api/product";

/* ================= VALIDATION ================= */

const ProductValidationSchema =
  Yup.object().shape({

    title: Yup.string()
      .min(3, "Too short!")
      .required("Product title required"),

    description: Yup.string()
      .min(10, "Provide better description")
      .required("Description required"),

    price: Yup.number()
      .positive("Must be greater than 0")
      .required("Price required"),

    oldPrice:
      Yup.number().nullable(),

    discount:
      Yup.number().nullable(),

    rating:
      Yup.number().nullable(),

    category:
      Yup.string().required(
        "Category required"
      ),

    imageUrl:
      Yup.string().required(
        "Image URL required"
      ),

  });

export default function ProductsPage() {

  const [products, setProducts] =
    useState([]);

  const [loading,
    setLoading] =
    useState(true);

  const [isModalOpen,
    setIsModalOpen] =
    useState(false);

  const [editingProduct,
    setEditingProduct] =
    useState(null);

  const [showTrash,
    setShowTrash] =
    useState(false);

  /* ================= FETCH ================= */

  const fetchProducts =
    async () => {

      try {

        setLoading(true);

        const endpoint =
          showTrash
            ? "/trash"
            : "/productlist";

        const response =
          await axios.get(
            `${API_BASE_URL}${endpoint}`
          );

        if (
          response.data.success
        ) {

          setProducts(
            response.data.data
          );

        }

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

      }

    };

  useEffect(() => {

    fetchProducts();

  }, [showTrash]);

  /* ================= SUBMIT ================= */

  const handleFormSubmit =
    async (
      values,
      {
        resetForm,
        setSubmitting,
      }
    ) => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        const productData = {

          title:
            values.title,

          category:
            values.category,

          description:
            values.description,

          price:
            Number(values.price),

          oldPrice:
            Number(
              values.oldPrice
            ) || 0,

          discount:
            Number(
              values.discount
            ) || 0,

          rating:
            Number(
              values.rating
            ) || 0,

          imageUrl:
            values.imageUrl,

        };

        let response;

        /* EDIT */

        if (editingProduct) {

          response =
            await axios.put(

              `${API_BASE_URL}/edit/${editingProduct._id}`,

              productData,

              {
                headers: {
                  Authorization:
                    `Bearer ${token}`,
                },
              }

            );

        }

        /* ADD */

        else {

          response =
            await axios.post(

              `${API_BASE_URL}/add`,

              productData,

              {
                headers: {
                  Authorization:
                    `Bearer ${token}`,
                },
              }

            );

        }

        if (
          response.data.success
        ) {

          alert(

            editingProduct
              ? "Product Updated!"
              : "Product Added!"

          );

          fetchProducts();

          resetForm();

          setEditingProduct(
            null
          );

          setIsModalOpen(
            false
          );

        }

      } catch (error) {

        console.log(error);

        alert(

          error.response?.data
            ?.message ||

          "Something went wrong"

        );

      } finally {

        setSubmitting(false);

      }

    };

  /* ================= EDIT ================= */

  const handleEdit =
    (product) => {

      setEditingProduct(
        product
      );

      setIsModalOpen(true);

    };

  /* ================= DELETE ================= */

  const handleDelete =
    async (id) => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        const response =
          await axios.put(

            `${API_BASE_URL}/delete/${id}`,

            {},

            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }

          );

        if (
          response.data.success
        ) {

          alert(
            "Product moved to trash"
          );

          fetchProducts();

        }

      } catch (error) {

        console.log(error);

      }

    };

  /* ================= RESTORE ================= */

  const handleRestore =
    async (id) => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        const response =
          await axios.put(

            `${API_BASE_URL}/restore/${id}`,

            {},

            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }

          );

        if (
          response.data.success
        ) {

          alert(
            "Product restored"
          );

          fetchProducts();

        }

      } catch (error) {

        console.log(error);

      }

    };

  return (

    <div className="admin-tab-view product-mgmt-view">

      {/* HEADER */}

      <header className="mgmt-header">

        <h1>
          Product Management
        </h1>

        <button
          className="add-product-main-btn"
          onClick={() => {

            setEditingProduct(
              null
            );

            setIsModalOpen(true);

          }}
        >
          Add Product
        </button>

      </header>

      {/* FILTER */}

      <div className="product-filter-btns">

        <button
          className={
            !showTrash
              ? "active-filter"
              : ""
          }
          onClick={() =>
            setShowTrash(false)
          }
        >
          Products
        </button>

        <button
          className={
            showTrash
              ? "active-filter"
              : ""
          }
          onClick={() =>
            setShowTrash(true)
          }
        >
          Trash
        </button>

      </div>

      {/* TABLE */}

      {loading ? (

        <div className="loading-box">
          Loading...
        </div>

      ) : (

        <table className="inventory-table">

          <thead>

            <tr>

              <th>Image</th>
              <th>Title</th>
              <th>Category</th>
              <th>Price</th>
              <th>Rating</th>
              <th>Actions</th>

            </tr>

          </thead>

          <tbody>

            {products.map(
              (product) => (

                <tr key={product._id}>

                  <td>

                    <img
                      src={product.imageUrl}
                      alt={product.title}
                      className="prod-table-thumb"
                    />

                  </td>

                  <td>

                    <div>
                      {product.title}
                    </div>

                    <small>
                      {product.description}
                    </small>

                  </td>

                  <td>
                    {product.category}
                  </td>

                  <td>

                    ₹{product.price}

                    {product.oldPrice > 0 && (

                      <small
                        style={{
                          textDecoration:
                            "line-through",
                          marginLeft: "8px",
                          color: "#6b7280",
                        }}
                      >
                        ₹{product.oldPrice}
                      </small>

                    )}

                  </td>

                  <td>
                    {product.rating}
                  </td>

                  <td>

                    <div className="action-buttons-group">

                      {!showTrash ? (

                        <>

                          <button
                            className="act-btn edit-btn"
                            onClick={() =>
                              handleEdit(
                                product
                              )
                            }
                          >
                            Edit
                          </button>

                          <button
                            className="act-btn delete-btn"
                            onClick={() =>
                              handleDelete(
                                product._id
                              )
                            }
                          >
                            Delete
                          </button>

                        </>

                      ) : (

                        <button
                          className="act-btn restore-btn"
                          onClick={() =>
                            handleRestore(
                              product._id
                            )
                          }
                        >
                          Restore
                        </button>

                      )}

                    </div>

                  </td>

                </tr>

              )
            )}

          </tbody>

        </table>

      )}

      {/* MODAL */}

      {isModalOpen && (

        <div className="modal-backdrop-tint">

          <div className="formik-modal-card">

            <h2>

              {editingProduct
                ? "Edit Product"
                : "Add Product"}

            </h2>

            <Formik

              initialValues={{

                title:
                  editingProduct?.title || "",

                description:
                  editingProduct?.description || "",

                price:
                  editingProduct?.price || "",

                oldPrice:
                  editingProduct?.oldPrice || "",

                discount:
                  editingProduct?.discount || "",

                rating:
                  editingProduct?.rating || "",

                category:
                  editingProduct?.category || "",

                imageUrl:
                  editingProduct?.imageUrl || "",

              }}

              enableReinitialize={true}

              validationSchema={
                ProductValidationSchema
              }

              onSubmit={
                handleFormSubmit
              }

            >

              {({
                isSubmitting,
              }) => (

                <Form className="formik-interactive-form">

                  <div className="form-input-group">

                    <label>
                      Product Title
                    </label>

                    <Field
                      type="text"
                      name="title"
                    />

                    <ErrorMessage
                      name="title"
                      component="span"
                      className="form-field-error"
                    />

                  </div>

                  <div className="form-input-group">

                    <label>
                      Description
                    </label>

                    <Field
                      as="textarea"
                      name="description"
                    />

                    <ErrorMessage
                      name="description"
                      component="span"
                      className="form-field-error"
                    />

                  </div>

                  <div className="form-double-column-row">

                    <div className="form-input-group">

                      <label>
                        Price
                      </label>

                      <Field
                        type="number"
                        name="price"
                      />

                    </div>

                    <div className="form-input-group">

                      <label>
                        Old Price
                      </label>

                      <Field
                        type="number"
                        name="oldPrice"
                      />

                    </div>

                  </div>

                  <div className="form-double-column-row">

                    <div className="form-input-group">

                      <label>
                        Discount %
                      </label>

                      <Field
                        type="number"
                        name="discount"
                      />

                    </div>

                    <div className="form-input-group">

                      <label>
                        Rating
                      </label>

                      <Field
                        type="number"
                        step="0.1"
                        name="rating"
                      />

                    </div>

                  </div>

                  <div className="form-input-group">

                    <label>
                      Category
                    </label>

                    <Field
                      as="select"
                      name="category"
                    >

                      <option value="">
                        Select Category
                      </option>

                      <option value="Fruit">
                        Fruit
                      </option>

                      <option value="Vegetable">
                        Vegetable
                      </option>

                    </Field>

                  </div>

                  <div className="form-input-group">

                    <label>
                      Image URL
                    </label>

                    <Field
                      type="text"
                      name="imageUrl"
                    />

                  </div>

                  <div className="form-footer-action-strip">

                    <button
                      type="button"
                      className="cancel-btn"
                      onClick={() => {

                        setIsModalOpen(
                          false
                        );

                        setEditingProduct(
                          null
                        );

                      }}
                    >
                      Cancel
                    </button>

                    <button
                      type="submit"
                      className="submit-btn"
                      disabled={
                        isSubmitting
                      }
                    >

                      {isSubmitting
                        ? "Saving..."
                        : editingProduct
                        ? "Update Product"
                        : "Add Product"}

                    </button>

                  </div>

                </Form>

              )}

            </Formik>

          </div>

        </div>

      )}

    </div>

  );

}