const slugify = require("slugify");
const Product = require("../models/productModel");
const Category = require("../models/categoryModel");
const fs = require("fs");
const braintree = require("braintree");
const dotenv = require("dotenv");
const Order = require("../models/orderModel");

dotenv.config();

//payment gateway
var gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});

const createProductController = async (req, res) => {
  try {
    const { name, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;

    //VALIDATION
    switch (true) {
      case !name:
        return res.status(500).send({ error: "name is Required" });
      case !description:
        return res.status(500).send({ error: "description is Required" });
      case !price:
        return res.status(500).send({ error: "price is Required" });
      case !category:
        return res.status(500).send({ error: "category is Required" });
      case !quantity:
        return res.status(500).send({ error: "quantity is Required" });
      case !photo && photo.size > 1000000:
        return res
          .status(500)
          .send({ error: "photo is Required and should be less than 1mb" });
    }

    const product = new Product({ ...req.fields, slug: slugify(name) });
    if (photo) {
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
    }
    await product.save();
    res.status(201).send({
      success: true,
      message: "Product Created Successfully",
      product,
    });
  } catch (error) {
    console.log("error in createProductController", error);
    res.status(500).send({
      success: false,
      error,
      message: "error while creating product",
    });
  }
};

const getProductController = async (req, res) => {
  try {
    const product = await Product.find({})
      .populate("category")
      .select("-photo")
      // .limit(12)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      total: product.length,
      message: "All Products",
      product,
    });
  } catch (error) {
    console.log("error in getProductController", error);
    res.status(500).send({
      success: false,
      error,
      message: "error while getting product",
    });
  }
};

const getSingleProductController = async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug })
      .select("-photo")
      .populate("category");
    res.status(200).send({
      success: true,
      message: "Single Product Fetched",
      product,
    });
  } catch (error) {
    console.log("error in getSingleProductController", error);
    res.status(500).send({
      success: false,
      error,
      message: "error while getting single product",
    });
  }
};

const productPhotoController = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id).select("photo");
    if (product.photo.data) {
      res.set("Content-type", product.photo.contentType);
      return res.status(200).send(product.photo.data);
    }
  } catch (error) {
    console.log("error in productPhotoController", error);
    res.status(500).send({
      success: false,
      error,
      message: "error while getting product photo",
    });
  }
};

const deleteProductController = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id).select("-photo");
    res.status(200).send({
      success: true,
      message: "Product Deleted Successfully",
      product,
    });
  } catch (error) {
    console.log("error in deleteProductController", error);
    res.status(500).send({
      success: false,
      error,
      message: "error while product product",
    });
  }
};

const updateProductController = async (req, res) => {
  try {
    const { name, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;
    const { id } = req.params;

    //VALIDATION
    switch (true) {
      case !name:
        return res.status(500).send({ error: "name is Required" });
      case !description:
        return res.status(500).send({ error: "description is Required" });
      case !price:
        return res.status(500).send({ error: "price is Required" });
      case !category:
        return res.status(500).send({ error: "category is Required" });
      case !quantity:
        return res.status(500).send({ error: "quantity is Required" });
    }

    const products = await Product.findByIdAndUpdate(
      id,
      { ...req.fields, slug: slugify(name) },
      { new: true }
    );
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }
    await products.save();
    res.status(201).send({
      success: true,
      message: "Product Updated Successfully",
      products,
    });
  } catch (error) {
    console.log("error in updateProductController", error);
    res.status(500).send({
      success: false,
      error,
      message: "error while updating product",
    });
  }
};

const productFiltersController = async (req, res) => {
  try {
    const { checked, radio } = req.body;
    let args = {};
    if (checked.length > 0) args.category = checked;
    if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };
    const products = await Product.find(args);
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log("error while filtering products", error);
    res.status(400).send({
      success: false,
      message: "Error while filtering products",
      error,
    });
  }
};

const productCountController = async (req, res) => {
  try {
    const total = await Product.find({}).estimatedDocumentCount();
    res.status(200).send({
      success: true,
      total,
    });
  } catch (error) {
    console.log("error while counting products", error);
    res.status(400).send({
      success: false,
      message: "Error while counting products",
      error,
    });
  }
};

const searchProductController = async (req, res) => {
  try {
    const { keyword } = req.params;
    const results = await Product.find({
      $or: [
        { name: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    }).select("-photo");
    res.json(results);
  } catch (error) {
    console.log("error while searching product", error);
    res.status(400).send({
      success: false,
      message: "error while searching product",
      error,
    });
  }
};

const relatedProductController = async (req, res) => {
  try {
    const { pid, cid } = req.params;
    const products = await Product.find({
      category: cid,
      _id: { $ne: pid },
    })
      .select("-photo")
      .limit(3)
      .populate("category");
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log("error in relatedProductController", error);
    res.status(400).send({
      success: false,
      message: "error in relatedProductController",
      error,
    });
  }
};

const productCategoryController = async (req, res) => {
  try {
    const category = await Category.findOne({ slug: req.params.slug });
    const products = await Product.find({ category }).populate("category");
    res.status(200).send({
      success: true,
      category,
      products,
    });
  } catch (error) {
    console.log("Error While Getting products", error);
    res.status(400).send({
      success: false,
      error,
      message: "Error While Getting products",
    });
  }
};

//PAYMENT GATEWAY API
//GENERATING CLIENT TOKEN
const braintreeTokenController = async (req, res) => {
  try {
    gateway.clientToken.generate({}, function (err, response) {
      if (err) {
        res.status(500).send("error white generating client token", err);
      } else {
        res.send(response);
      }
    });
  } catch (error) {
    console.log("error white generating client token", error);
  }
};

//payment
const brainTreePaymentController = async (req, res) => {
  try {
    const { nonce, cart } = req.body;
    let total = 0;
    cart.map((i) => {
      total += i.price;
    });
    let newTransaction = gateway.transaction.sale(
      {
        amount: total,
        paymentMethodNonce: nonce,
        options: {
          submitForSettlement: true,
        },
      },
      function (error, result) {
        if (result) {
          const order = new Order({
            products: cart,
            payment: result,
            buyer: req.user._id,
          }).save();
          res.json({ ok: true });
        } else {
          res
            .status(500)
            .send("error while payment in braintreePaymentController", error);
        }
      }
    );
  } catch (error) {
    console.log("error while payment in braintreePaymentController", error);
  }
};

module.exports = {
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
};
