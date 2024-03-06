const mongoose = require("mongoose");
const colors = require("colors");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(`Connnected to MongoDb -> ${conn.connection.host}`.yellow);
  } catch (error) {
    console.log(`Error in MongoDb ${error}`.red);
  }
};

// export default connectDB;
module.exports = connectDB;
