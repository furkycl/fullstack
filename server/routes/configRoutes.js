const express = require("express");
const router = express.Router();

// @route   GET api/configs
// @desc    Giriş yapmış kullanıcının tüm konfigürasyonlarını getirir
// @access  Private
// BU SATIRI KONTROL ET -> router.get OLMALI
router.get("/", (req, res) => {
  res.send("Get All Configurations Route");
});

// @route   POST api/configs
// @desc    Yeni bir konfigürasyon kaydeder
// @access  Private
router.post("/", (req, res) => {
  res.send("Save Configuration Route");
});

module.exports = router;
