const express = require("express");
const app = express();

const connectDB = require("./db");

connectDB();

app.use(express.json());

const userRoutes = require("./routes/userRoutes");

app.use("/users", userRoutes);

app.listen(process.env.PORT || 3000, () => {
  console.log("Server start ho gaya");
});