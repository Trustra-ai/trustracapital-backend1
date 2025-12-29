const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/auth.middleware");

// Admin-only middleware
const adminOnly = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ error: "Admin access required" });
  }
  next();
};

router.get("/stats", authenticate, adminOnly, async (req, res) => {
  res.json({
    users: 120,
    accounts: 340,
    transactions: 1245
  });
});

module.exports = router;
