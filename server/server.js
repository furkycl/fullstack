require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");

connectDB();
const authRoutes = require("./routes/authRoutes");

// 1. Rota dosyalarını içeri aktarıyoruz (SENDE EKSİK OLAN KISIM)
const configRoutes = require("./routes/configRoutes");

const app = express();
app.use(express.json());

const PORT = process.env.PORT;

// 2. ROTALARI UYGULAMAYA TANITIYORUZ (SENDE EKSİK OLAN KISIM)
// Bu satırlar birer "middleware" (ara yazılım) görevi görür.
// Gelen istekleri, URL'nin başlangıcına göre ilgili rota dosyasına yönlendirirler.
//
// '/api/auth' ile başlayan tüm istekler artık authRoutes dosyası tarafından yönetilecek.
app.use("/api/auth", authRoutes);
// '/api/configs' ile başlayan tüm istekler ise configRoutes dosyası tarafından yönetilecek.
app.use("/api/configs", configRoutes);

// Ana ('/') rotası. Genellikle en sonda veya diğer rotalardan ayrı durur.
app.get("/", (req, res) => {
  res.send("API is running...");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
