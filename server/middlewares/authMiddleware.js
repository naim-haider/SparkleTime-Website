const JWT = require("jsonwebtoken");
const User = require("../models/userModel");

//Protected Routes token base
const requireSignIn = async (req, res, next) => {
  try {
    const decode = JWT.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    req.user = decode;
    next();
  } catch (error) {
    console.log("error in authMiddleware/requireSignIn ", error);
  }
};

// Admin access
const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (user.role !== "admin") {
      return res.status(401).send({
        success: false,
        message: "Unauthorized Access",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log("error in authMiddleware/isAdmin");
    res.status(401).send({
      success: false,
      error,
      message: "Error in Admin middleware",
    });
  }
};

module.exports = { requireSignIn, isAdmin };
