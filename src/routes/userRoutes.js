const authMiddleware = require("../middleware/auth");
const express = require("express");
const router = express.Router();

const {
  getUsers,
  createUser,
  loginUser,
  updateUser,
  deleteUser
} = require("../controllers/userController");

// ROUTES
router.get("/", authMiddleware, getUsers);
router.post("/signup", createUser);
router.post("/login", loginUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;