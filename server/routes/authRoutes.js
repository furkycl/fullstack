const express = require("express");
const router = express.Router();

// @route   GET api/auth/register (TEST İÇİN GEÇİCİ OLARAK GET YAPILDI)
// @desc    Kullanıcı kaydı
// @access  Public
// Sadece bu satırı .post'tan .get'e çevirdik.
router.get("/register", (req, res) => {
  res.send("Register Route");
});

// @route   POST api/auth/login
// @desc    Kullanıcı girişi
// @access  Public
router.post("/login", (req, res) => {
  res.send("Login Route");
});

module.exports = router;
