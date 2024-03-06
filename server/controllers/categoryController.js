const slugify = require("slugify");
const Category = require("../models/categoryModel");

// CREATE CATEGORY
const createCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(401).send({ message: "Name is required" });
    }
    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      return res.status(200).send({
        success: false,
        message: "Category Already exists",
      });
    }
    const category = await new Category({ name, slug: slugify(name) }).save();
    res.status(201).send({
      success: true,
      message: "new category added",
      category,
    });
  } catch (error) {
    console.log("error in categoryController", error);
    res.status(500).send({
      success: false,
      error,
      message: "error in categoryContoller",
    });
  }
};

//UPDATE CATEGORY
const updateCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;
    const category = await Category.findByIdAndUpdate(
      id,
      { name, slug: slugify(name) },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "category updated successfully",
      category,
    });
  } catch (error) {
    console.log("error in updateCategoryController", error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while updating category",
    });
  }
};

// GET ALL CATEGORIES
const getAllCategoriesController = async (req, res) => {
  try {
    const category = await Category.find({});
    res.status(200).send({
      success: true,
      message: "All Categories List",
      category,
    });
  } catch (error) {
    console.log("error in getAllCategoriesController");
    res.status(500).send({
      success: false,
      error,
      message: "Error while getting all categories",
    });
  }
};

// GET SINGLE CATEGORY
const getSingleCategoryController = async (req, res) => {
  try {
    const category = await Category.findOne({ slug: req.params.slug });
    res.status(200).send({
      success: true,
      message: "Get Single Category Successfully",
      category,
    });
  } catch (error) {
    console.log("error in getSingleCategoryController");
    res.status(500).send({
      success: false,
      error,
      message: "Error while getting single categoriy",
    });
  }
};

// DELETE CATEGORY
const deleteCategoryController = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "category successfully deleted",
      category,
    });
  } catch (error) {
    console.log("error in deleteCategoryController");
    res.status(500).send({
      success: false,
      error,
      message: "error while deleting category",
    });
  }
};
module.exports = {
  createCategoryController,
  updateCategoryController,
  getAllCategoriesController,
  getSingleCategoryController,
  deleteCategoryController,
};
