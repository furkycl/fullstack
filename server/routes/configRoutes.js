const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware"); // Koruma middleware'imizi import et
const Configuration = require("../models/Configuration"); // Configuration modelimizi import et

// @route   POST api/configs
// @desc    Yeni bir konfigürasyon kaydeder
// @access  Private (Sadece giriş yapmış kullanıcılar)
// NOT: İkinci parametre olarak 'protect' middleware'ini ekledik.
// Bu, aşağıdaki fonksiyona gelmeden önce kullanıcının yetkisini kontrol eder.
router.post("/", protect, async (req, res) => {
  try {
    const { name, color, material } = req.body;

    const newConfiguration = new Configuration({
      name,
      color,
      material,
      user: req.user.id, // 'protect' middleware'i sayesinde req.user'a erişebiliyoruz
    });

    const savedConfiguration = await newConfiguration.save();
    res.status(201).json(savedConfiguration);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Sunucu Hatası");
  }
});

// @route   GET api/configs
// @desc    Giriş yapmış kullanıcının tüm konfigürasyonlarını getirir
// @access  Private
router.get("/", protect, async (req, res) => {
  try {
    // Sadece 'req.user.id' ile eşleşen konfigürasyonları bul
    const configurations = await Configuration.find({ user: req.user.id });
    res.json(configurations);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Sunucu Hatası");
  }
});

module.exports = router;
