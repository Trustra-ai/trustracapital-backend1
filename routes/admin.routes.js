const express = require("express");
const User = require("../models/User");
const auth = require("../middleware/auth.middleware");
const admin = require("../middleware/admin.middleware");

const router = express.Router();

router.get("/stats", auth, admin, async (req, res) => {
  const users = await User.countDocuments();
  const accounts = await User.aggregate([
    { $project: { count: { $size: "$accounts" } } },
    { $group: { _id: null, total: { $sum: "$count" } } }
  ]);

  res.json({
    users,
    accounts: accounts[0]?.total || 0,
    transactions: 0
  });
});

router.get("/users", auth, admin, async (req, res) => {
  const users = await User.find().select("email disabled");
  res.json(users);
});

router.post("/users/:id/toggle", auth, admin, async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ error: "User not found" });

  user.disabled = !user.disabled;
  await user.save();

  res.json({ status: "updated" });
});

module.exports = router;
