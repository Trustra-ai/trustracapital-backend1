require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes");
const adminRoutes = require("./routes/admin.routes");

const app = express();

app.use(express.json());
app.use(cors({ origin: "*" }));

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);

app.get("/", (_, res) => res.send("API running"));

app.use((_, res) => res.status(404).json({ message: "Route not found" }));

app.listen(process.env.PORT || 5000);
