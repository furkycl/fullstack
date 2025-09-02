const mongoose = require("mongoose");

const configurationSchema = new mongoose.Schema(
  {
    // Bu konfigürasyonun hangi kullanıcıya ait olduğunu belirtmek için.
    // 'User' modeline bir referans (ilişki) kuruyoruz.
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: true,
      trim: true, // Başındaki ve sonundaki boşlukları temizler
    },
    // Bu alanları frontend'de 3D modelimizi oluştururken belirleyeceğiz.
    // Şimdilik örnek olarak ekliyoruz.
    color: {
      type: String,
      required: true,
      default: "#ffffff", // Varsayılan değer
    },
    material: {
      type: String,
      required: true,
      default: "metal",
    },
    // Diğer özellikleri buraya ekleyebiliriz...
    // ...
  },
  {
    timestamps: true, // createdAt ve updatedAt alanlarını otomatik ekler
  }
);

const Configuration = mongoose.model("Configuration", configurationSchema);

module.exports = Configuration;
