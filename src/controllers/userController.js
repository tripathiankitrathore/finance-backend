const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

// GET USERS
const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.send("Error in GET ❌");
  }
};

// SIGNUP (CREATE USER)
const createUser = async (req, res) => {
  try {
    const { name, email, password, age } = req.body;

    // 🔐 HASH PASSWORD
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      age
    });

    await newUser.save();

    res.send("User registered successfully 🔥");
  } catch (error) {
    res.send("Signup error ❌");
  }
};
// LOGIN
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.send("User not found ❌");
    }

    // 🔐 PASSWORD MATCH
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.send("Wrong password ❌");
    }

    const token = require("jsonwebtoken").sign(
      { id: user._id },
      "secretkey123",
      { expiresIn: "1h" }
    );

    res.json({
      message: "Login success 🔥",
      token
    });

  } catch (error) {
    res.send("Login error ❌");
  }
};

// UPDATE USER
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedUser = await User.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );

    res.json(updatedUser);
  } catch (error) {
    res.send("Update error ❌");
  }
};

// DELETE USER
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    await User.findByIdAndDelete(id);

    res.send("User deleted 🗑️");
  } catch (error) {
    res.send("Delete error ❌");
  }
};

module.exports = {
  getUsers,
  createUser,
  loginUser,
  updateUser,
  deleteUser
};