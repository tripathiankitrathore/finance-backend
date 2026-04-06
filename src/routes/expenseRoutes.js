const express = require("express");
const router = express.Router();

const expenseController = require("../controllers/expenseController");
const authMiddleware = require("../middleware/auth");

// ADD
router.post("/add", authMiddleware, expenseController.addExpense);

// GET + FILTER
router.get("/get", authMiddleware, expenseController.getExpenses);

// DELETE
router.delete("/delete/:id", authMiddleware, expenseController.deleteExpense);

// UPDATE
router.put("/update/:id", authMiddleware, expenseController.updateExpense);

// TOTAL
router.get("/total", authMiddleware, expenseController.getTotalExpense);

module.exports = router;