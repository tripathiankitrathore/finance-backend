const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://tripathiankit614_db_user:ankit123@cluster0.eodsumt.mongodb.net/?retryWrites=true&w=majority"
    );

    console.log("MongoDB connected successfully ✅");
  } catch (error) {
    console.log("MongoDB connection error ❌", error);
  }
};

module.exports = connectDB;