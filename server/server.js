const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv");
const morgan = require("morgan");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoute");
const categoryRoute = require("./routes/categoryRoute");
const productRoute = require("./routes/productRoute");
const cors = require("cors");

//configure env
dotenv.config();

// ----- for database ------
//database config
connectDB();

//rest object
const app = express();

// ------ for database -------
//middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//routes
app.use("/api/auth", authRoutes);
app.use("/api/category", categoryRoute);
app.use("/api/product", productRoute);

//rest api
app.get("/", (req, res) => {
  res.send("<h1>Welcome to E-commerce app</h1>");
});

//Port
const PORT = process.env.PORT || 8080;

//run listen
app.listen(PORT, () => {
  console.log(
    `Server is running on ${process.env.DEV_MODE} mode on port ->  ${PORT}`.blue
  );
});
