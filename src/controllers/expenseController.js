const Expense = require("../models/Expense");


// ➕ ADD EXPENSE
exports.addExpense = async (req, res) => {
  try {
    const { title, amount, category } = req.body;

    if (!title || !amount || !category) {
      return res.status(400).json({
        message: "All fields required ❌",
      });
    }

    const expense = new Expense({
      title,
      amount,
      category,
      userId: req.userId,
    });

    await expense.save();

    res.json({
      message: "Expense added ✅",
      expense,
    });

  } catch (error) {
    res.status(500).json({
      message: "Error adding expense ❌",
    });
  }
};


// 📥 GET + FILTER EXPENSES
exports.getExpenses = async (req, res) => {
  try {
    const { category, min, max, startDate, endDate } = req.query;

    let filter = { userId: req.userId };

    // category
    if (category) {
      filter.category = category;
    }

    // amount
    if (min || max) {
      filter.amount = {};
      if (min) filter.amount.$gte = Number(min);
      if (max) filter.amount.$lte = Number(max);
    }

    // date
    if (startDate && endDate) {
      filter.createdAt = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }

    const expenses = await Expense.find(filter).sort({ createdAt: -1 });

    res.json({ expenses });

  } catch (error) {
    res.status(500).json({
      message: "Error fetching ❌",
    });
  }
};


// ❌ DELETE EXPENSE
exports.deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Expense.findOneAndDelete({
      _id: id,
      userId: req.userId,
    });

    if (!deleted) {
      return res.status(404).json({
        message: "Expense not found ❌",
      });
    }

    res.json({
      message: "Expense deleted ✅",
    });

  } catch (error) {
    res.status(500).json({
      message: "Error deleting ❌",
    });
  }
};


// ✏️ UPDATE EXPENSE
exports.updateExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, amount, category } = req.body;

    const updated = await Expense.findOneAndUpdate(
      { _id: id, userId: req.userId },
      { title, amount, category },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({
        message: "Expense not found ❌",
      });
    }

    res.json({
      message: "Expense updated ✅",
      updated,
    });

  } catch (error) {
    res.status(500).json({
      message: "Error updating ❌",
    });
  }
};


// 💰 TOTAL EXPENSE
exports.getTotalExpense = async (req, res) => {
  try {
    const expenses = await Expense.find({ userId: req.userId });

    const total = expenses.reduce((sum, item) => sum + item.amount, 0);

    res.json({ total });

  } catch (error) {
    res.status(500).json({
      message: "Error calculating ❌",
    });
  }
};