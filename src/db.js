const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://tripathiankit614_db_user:NhwQrnt5lab1U58f@cluster0.eodsumt.mongodb.net/?appName=Cluster0");
    console.log("MongoDB connected successfully ✅");
  } catch (error) {
    console.log("MongoDB connection error ❌", error);
  }
};

module.exports = connectDB;