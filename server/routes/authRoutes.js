const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs"); // bcryptjs'i içeri aktar
const User = require("../models/User"); // User modelimizi içeri aktar

// @route   POST api/auth/register
// @desc    Kullanıcı kaydı
// @access  Public
// NOT: Fonksiyonu 'async' yaptık çünkü içinde veritabanı işlemleri (await) olacak.
router.post("/register", async (req, res) => {
  // 1. Gelen istekten kullanıcı bilgilerini al
  const { username, email, password } = req.body;

  try {
    // 2. Kullanıcının zaten var olup olmadığını kontrol et
    let userByEmail = await User.findOne({ email });
    if (userByEmail) {
      // 400: Bad Request (Kötü İstek)
      return res
        .status(400)
        .json({ msg: "Bu email adresi ile bir kullanıcı zaten mevcut" });
    }

    let userByUsername = await User.findOne({ username });
    if (userByUsername) {
      return res.status(400).json({ msg: "Bu kullanıcı adı zaten alınmış" });
    }

    // 3. Yeni bir kullanıcı nesnesi oluştur (henüz kaydetmedik)
    let user = new User({
      username,
      email,
      password,
    });

    // 4. Şifreyi şifrele (hash'le)
    const salt = await bcrypt.genSalt(10); // Şifrelemeyi daha güvenli hale getiren "tuz"
    user.password = await bcrypt.hash(password, salt); // Şifreyi hash'le ve user nesnesine ata

    // 5. Kullanıcıyı veritabanına kaydet
    await user.save();

    // 6. Başarılı bir cevap döndür (ÖNEMLİ: Şifreyi asla geri döndürme!)
    // 201: Created (Oluşturuldu)
    res.status(201).json({ msg: "Kullanıcı başarıyla oluşturuldu" });
  } catch (err) {
    console.error(err.message);
    // 500: Internal Server Error (Sunucu Hatası)
    res.status(500).send("Sunucu Hatası");
  }
});

// Login rotası şimdilik aynı kalabilir
router.post("/login", (req, res) => {
  res.send("Login Route");
});

module.exports = router;
