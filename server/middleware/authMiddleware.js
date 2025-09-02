const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  let token;

  // Token genellikle 'Authorization' başlığında 'Bearer <token>' formatında gönderilir
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // 1. 'Bearer ' kısmını atıp sadece token'ı al
      token = req.headers.authorization.split(" ")[1];

      // 2. Token'ı doğrula
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // 3. Token'dan gelen kullanıcı ID'si ile kullanıcıyı bul ve şifre olmadan req nesnesine ekle
      // Bu sayede korunan rotalarda req.user diyerek giriş yapmış kullanıcıya erişebileceğiz
      req.user = await User.findById(decoded.user.id).select("-password");

      next(); // Her şey yolundaysa, bir sonraki adıma (asıl rota mantığına) geç
    } catch (error) {
      console.error(error);
      res.status(401).json({ msg: "Yetkisiz işlem, token geçersiz" });
    }
  }

  if (!token) {
    res.status(401).json({ msg: "Yetkisiz işlem, token bulunamadı" });
  }
};

module.exports = { protect };
