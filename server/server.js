require("dotenv").config();
// 1. Gerekli paketi içeri aktarıyoruz
const express = require("express");

// 2. Express uygulamasını oluşturuyoruz
const app = express();

// 3. Port numarasını belirliyoruz.
//    Process.env.PORT, projemiz yayınlandığında platformun bize atayacağı porttur.
//    Lokalde çalışırken 5000 portunu kullanacağız.
const PORT = process.env.PORT;

// 4. Ana route'u (/) tanımlıyoruz.
//    Birisi web sitemizin ana adresine GET isteği attığında ne olacağını söylüyoruz.
app.get("/", (req, res) => {
  res.send("API is running...");
});

// 5. Sunucuyu belirlediğimiz portta dinlemeye başlatıyoruz
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
