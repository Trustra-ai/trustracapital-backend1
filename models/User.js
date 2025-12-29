const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema({
  currency: { type: String, default: "USD" },
  balance: { type: Number, default: 0 }
});

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user"
  },
  disabled: {
    type: Boolean,
    default: false
  },
  accounts: [accountSchema]
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
