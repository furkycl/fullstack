require("dotenv").config();
const express = require("express");
const cors = require("cors"); // <-- 1. BU SATIRI EKLE
const connectDB = require("./config/db");

connectDB();

const authRoutes = require("./routes/authRoutes");
const configRoutes = require("./routes/configRoutes");

const app = express();

// Middlewares
app.use(cors()); // <-- 2. BU SATIRI EKLE (express.json'dan sonra veya önce olabilir, rotalardan önce olması önemli)
app.use(express.json());

// Rotalar
app.use("/api/auth", authRoutes);
app.use("/api/configs", configRoutes);

const PORT = process.env.PORT;

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
