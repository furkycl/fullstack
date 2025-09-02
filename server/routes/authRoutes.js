const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs"); // bcryptjs'i içeri aktar
const jwt = require("jsonwebtoken");
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

// @route   POST api/auth/login
// @desc    Kullanıcı girişi ve token alınması
// @access  Public
router.post("/login", async (req, res) => {
  // 1. Gelen istekten email ve şifreyi al
  const { email, password } = req.body;

  try {
    // 2. Kullanıcının email adresine göre veritabanında var olup olmadığını kontrol et
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "Geçersiz kullanıcı bilgileri" });
    }

    // 3. Girilen şifre ile veritabanındaki hash'lenmiş şifreyi karşılaştır
    // bcrypt.compare() bu işi güvenli bir şekilde yapar.
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Geçersiz kullanıcı bilgileri" });
      // Güvenlik için "şifre yanlış" gibi spesifik bir mesaj vermiyoruz.
    }

    // 4. Şifre doğruysa, JWT oluştur
    // Token'ın içine gömeceğimiz bilgi (payload). Asla şifre gibi hassas bilgileri koyma!
    const payload = {
      user: {
        id: user.id, // Veritabanındaki kullanıcı ID'si
      },
    };

    // Token'ı imzala
    jwt.sign(
      payload,
      process.env.JWT_SECRET, // .env dosyasındaki gizli anahtarımız
      { expiresIn: "5h" }, // Token'ın geçerlilik süresi (örneğin 5 saat)
      (err, token) => {
        if (err) throw err;
        // 5. Oluşturulan token'ı kullanıcıya geri gönder
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Sunucu Hatası");
  }
});
module.exports = router;
