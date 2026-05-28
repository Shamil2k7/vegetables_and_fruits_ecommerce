import mongoose from "mongoose";
import Product from "../models/productschema.js";

/* ================= GET PRODUCT LIST ================= */

export const getproductlist = async (req, res) => {
  try {

    const productlist =
      await Product.find({
        isDelete: false,
      });

    return res.status(200).json({
      success: true,
      message: "Products fetched successfully!",
      data: productlist,
    });

  } catch (error) {

    console.log(
      "Error on get product list",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Internal server error.",
      error: error.message,
    });

  }
};

/* ================= ADD PRODUCT ================= */

export const addproduct = async (
  req,
  res
) => {

  try {

    const {
      title,
      category,
      description,
      rating,
      price,
      oldPrice,
      discount,
      imageUrl,
    } = req.body;

    /* VALIDATION */

    if (
      !title ||
      !category ||
      !description ||
      !price ||
      !imageUrl
    ) {

      return res.status(400).json({

        success: false,

        message:
          "title, category, description, price and imageUrl are required.",

      });

    }

    /* CREATE PRODUCT */

    const newProduct =
      await Product.create({

        title,

        category,

        description,

        rating: rating || 0,

        price,

        oldPrice:
          oldPrice || 0,

        discount:
          discount || 0,

        imageUrl,

      });

    return res.status(201).json({

      success: true,

      message:
        "Product added successfully!",

      data: newProduct,

    });

  } catch (error) {

    console.log(
      "Error on add product",
      error
    );

    return res.status(500).json({

      success: false,

      message:
        "Internal server error while adding product.",

      error: error.message,

    });

  }

};

/* ================= GET PRODUCT BY ID ================= */

export const getProductById = async (
  req,
  res
) => {

  try {

    const { id } =
      req.params;

    /* CHECK OBJECT ID */

    if (
      !mongoose.Types.ObjectId.isValid(
        id
      )
    ) {

      return res.status(400).json({

        success: false,

        message:
          "Invalid Product ID format.",

      });

    }

    /* FIND PRODUCT */

    const product =
      await Product.findOne({

        _id: id,

        isDelete: false,

      });

    if (!product) {

      return res.status(404).json({

        success: false,

        message:
          "Product not found.",

      });

    }

    return res.status(200).json({

      success: true,

      message:
        "Product retrieved successfully!",

      data: product,

    });

  } catch (error) {

    console.log(
      "Error on get product by id",
      error
    );

    return res.status(500).json({

      success: false,

      message:
        "Internal server error while fetching product.",

      error: error.message,

    });

  }

};

/* ================= UPDATE PRODUCT ================= */

export const updateProduct = async (
  req,
  res
) => {

  try {

    const { id } =
      req.params;

    /* CHECK ID */

    if (
      !mongoose.Types.ObjectId.isValid(
        id
      )
    ) {

      return res.status(400).json({

        success: false,

        message:
          "Invalid Product ID",

      });

    }

    /* FIND PRODUCT */

    const product =
      await Product.findById(id);

    if (!product) {

      return res.status(404).json({

        success: false,

        message:
          "Product not found",

      });

    }

    /* UPDATE */

    const updatedProduct =
      await Product.findByIdAndUpdate(

        id,

        {
          title:
            req.body.title,

          category:
            req.body.category,

          description:
            req.body.description,

          rating:
            req.body.rating,

          price:
            req.body.price,

          oldPrice:
            req.body.oldPrice,

          discount:
            req.body.discount,

          imageUrl:
            req.body.imageUrl,
        },

        {
          new: true,
          runValidators: true,
        }

      );

    return res.status(200).json({

      success: true,

      message:
        "Product updated successfully",

      data: updatedProduct,

    });

  } catch (error) {

    console.log(
      "Update product error",
      error
    );

    return res.status(500).json({

      success: false,

      message:
        "Update failed",

      error: error.message,

    });

  }

};

/* ================= SOFT DELETE PRODUCT ================= */

export const deleteProduct = async (
  req,
  res
) => {

  try {

    const { id } =
      req.params;

    /* CHECK ID */

    if (
      !mongoose.Types.ObjectId.isValid(
        id
      )
    ) {

      return res.status(400).json({

        success: false,

        message:
          "Invalid Product ID",

      });

    }

    /* FIND PRODUCT */

    const product =
      await Product.findById(id);

    if (!product) {

      return res.status(404).json({

        success: false,

        message:
          "Product not found",

      });

    }

    /* SOFT DELETE */

    product.isDelete = true;

    await product.save();

    return res.status(200).json({

      success: true,

      message:
        "Product moved to trash",

    });

  } catch (error) {

    console.log(
      "Delete error",
      error
    );

    return res.status(500).json({

      success: false,

      message:
        "Delete failed",

      error: error.message,

    });

  }

};

/* ================= GET TRASH PRODUCTS ================= */

export const getTrashProducts = async (
  req,
  res
) => {

  try {

    const trashProducts =
      await Product.find({ isDelete: true }).limit(4);

    return res.status(200).json({

      success: true,

      message:
        "Trash products fetched",

      data: trashProducts,

    });

  } catch (error) {

    console.log(
      "Trash fetch error",
      error
    );

    return res.status(500).json({

      success: false,

      message:
        "Failed to fetch trash products",

      error: error.message,

    });

  }

};

/* ================= RESTORE PRODUCT ================= */

export const restoreProduct = async (
  req,
  res
) => {

  try {

    const { id } =
      req.params;

    /* CHECK ID */

    if (
      !mongoose.Types.ObjectId.isValid(
        id
      )
    ) {

      return res.status(400).json({

        success: false,

        message:
          "Invalid Product ID",

      });

    }

    /* FIND PRODUCT */

    const product =
      await Product.findById(id);

    if (!product) {

      return res.status(404).json({

        success: false,

        message:
          "Product not found",

      });

    }

    /* RESTORE */

    product.isDelete = false;

    await product.save();

    return res.status(200).json({

      success: true,

      message:
        "Product restored successfully",

    });

  } catch (error) {

    console.log(
      "Restore error",
      error
    );

    return res.status(500).json({

      success: false,

      message:
        "Restore failed",

      error: error.message,

    });

  }

};

// short product list
export const getproductlistshort =
  async (req, res) => {

    try {

      const productlist =
        await Product.find({
          isDelete: false,
        })

        .sort({
          rating: -1,
        })

        .limit(4);

      return res.status(200).json({

        success: true,

        message:
          "Top rated products fetched successfully!",

        data: productlist,

      });

    } catch (error) {

      console.log(error);

      return res.status(500).json({

        success: false,

        message:
          "Internal server error",

      });

    }

  };