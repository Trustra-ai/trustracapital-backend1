const express = require("express");
const authenticate = require("../middleware/authenticate");
const adminOnly = require("../middleware/adminOnly");
const usersDB = require("../data/usersDB");

const router = express.Router();

router.get("/stats", authenticate, adminOnly, (req, res) => {
  res.json({
    users: usersDB.length,
    transactions: 1245
  });
});

module.exports = router;
