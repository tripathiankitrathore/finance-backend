const express = require("express");
const router = express.Router();

const { signup, login } = require("../controllers/userController");
const authMiddleware = require("../middleware/auth");

router.post("/signup", signup);
router.post("/login", login);

router.get("/profile", authMiddleware, (req, res) => {
  res.json({
    message: "Protected route working ✅",
    userId: req.userId,
  });
});
module.exports = router;