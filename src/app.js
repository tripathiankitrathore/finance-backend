require("dotenv").config();

const express = require("express");
const app = express();

const connectDB = require("./db");
connectDB();

app.use(express.json());

const userRoutes = require("./routes/userRoutes");
app.use("/users", userRoutes);

const expenseRoutes = require("./routes/expenseRoutes");

app.use("/expense", expenseRoutes);

app.listen(process.env.PORT || 3000, () => {
  console.log("Server start ho gaya 🚀");
});