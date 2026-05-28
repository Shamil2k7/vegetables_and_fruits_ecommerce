import express from "express";

import {
  addproduct,
  deleteProduct,
  getProductById,
  getproductlist,
  getproductlistshort,
  getTrashProducts,
  restoreProduct,
  updateProduct
} from "../controller/productcontroller.js";

import {
  verifyAdmin
} from "../middleware/adminmiddleware.js";

export const porductRouter =
  express.Router();

/* PUBLIC */

porductRouter.get(
  "/productlist",
  getproductlist
);

porductRouter.get(
  "/trash",
  getTrashProducts
);

porductRouter.get(
  "/productdetails/:id",
  getProductById
);

/* ADMIN */

porductRouter.post(
  "/add",
  
  addproduct
);

porductRouter.put(
  "/edit/:id",
  
  updateProduct
);

porductRouter.put(
  "/delete/:id",
  
  deleteProduct
);

porductRouter.put(
  "/restore/:id",
  
  restoreProduct
);

porductRouter.get(
  "/productlistshort",
  getproductlistshort
);