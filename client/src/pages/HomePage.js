import React, { useState } from "react"; // useState'i import et
import { Canvas } from "@react-three/fiber";
import Experience from "../components/Experience";
import UI from "../components/UI"; // UI bileşenini import et

const HomePage = () => {
  // Seçilen rengi tutacak olan state'i oluşturuyoruz. Başlangıç rengi beyaz.
  const [selectedColor, setSelectedColor] = useState("#ffffff");

  // UI bileşeninden bir renk geldiğinde bu state'i güncelleyecek fonksiyon
  const handleColorChange = (color) => {
    setSelectedColor(color);
  };

  return (
    // style'ı bir div'e alarak UI'ın konumlanması için temel oluşturuyoruz
    <div style={{ position: "relative", height: "80vh", width: "100%" }}>
      <UI onColorChange={handleColorChange} />
      <Canvas>
        {/* Seçilen rengi Experience bileşenine prop olarak iletiyoruz */}
        <Experience selectedColor={selectedColor} />
      </Canvas>
    </div>
  );
};

export default HomePage;
