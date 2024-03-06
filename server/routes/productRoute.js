const express = require("express");
const { requireSignIn, isAdmin } = require("../middlewares/authMiddleware");
const {
  createProductController,
  getProductController,
  getSingleProductController,
  productPhotoController,
  deleteProductController,
  updateProductController,
  productFiltersController,
  productCountController,
  searchProductController,
  relatedProductController,
  productCategoryController,
  braintreeTokenController,
  brainTreePaymentController,
} = require("../controllers/productController");
const formidable = require("express-formidable");

//router object
const router = express.Router();

// ROUTES
// CREATE PRODUCT
router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable(),
  createProductController
);

// UPDATE PRODUCT
router.put(
  "/update-product/:id",
  requireSignIn,
  isAdmin,
  formidable(),
  updateProductController
);

// GET PRODUCT
router.get("/get-product", getProductController);

// GET SINGLE PRODUCT
router.get("/get-product/:slug", getSingleProductController);

// GET PHOTO
router.get("/product-photo/:id", productPhotoController);

// DELETE PRODUCT
router.delete(
  "/delete-product/:id",
  requireSignIn,
  isAdmin,
  deleteProductController
);

// FILTER PRODUCT
router.post("/product-filters", productFiltersController);

// PRODUCT COUNT
router.get("/product-count", productCountController);

// SEARCH PRODUCT
router.get("/search-product/:keyword", searchProductController);

// SIMILAR PRODUCT
router.get("/related-product/:pid/:cid", relatedProductController);

//CATEGORY WISE PRODUCT
router.get("/product-category/:slug", productCategoryController);

//PAYMENT ROUTES
//TOKEN
router.get("/braintree/token", braintreeTokenController);

//PAYMENTS
router.post("/braintree/payment", requireSignIn, brainTreePaymentController);

module.exports = router;
