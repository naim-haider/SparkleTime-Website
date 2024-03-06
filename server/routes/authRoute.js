const express = require("express");
const {
  registerController,
  loginController,
  testController,
  forgotPasswordController,
  updateProfileController,
  getOrdersController,
  getAllOrdersController,
  orderStatusController,
} = require("../controllers/authController");
const { requireSignIn, isAdmin } = require("../middlewares/authMiddleware");

//router object
const router = express.Router();

//routing
//REGISTER || METHOD POST
router.post("/register", registerController);

//LOGIN || METHOD POST
router.post("/login", loginController);

//FORGOT-PASSWORD || METHOD POST
router.post("/forgot-password", forgotPasswordController);

//TEST ROUTE || METHOD GET
router.get("/test", requireSignIn, isAdmin, testController);

//PROTECTED ROUTE AUTH FOR USER
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

//PROTECTED ROUTE AUTH FOR ADMIN
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

//UPDATE PROFILE
router.put("/profile", requireSignIn, updateProfileController);

//GETTING SINGLE ORDER
router.get("/orders", requireSignIn, getOrdersController);

//GETTING ALL ORDERS
router.get("/all-orders", requireSignIn, isAdmin, getAllOrdersController);

// UPDATE ORDER STATUS
router.put(
  "/order-status/:orderId",
  requireSignIn,
  isAdmin,
  orderStatusController
);

module.exports = router;
