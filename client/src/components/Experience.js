import React from "react";
// Stage ve OrbitControls, modeli güzelce sergilememizi ve kontrol etmemizi sağlar
import { Stage, OrbitControls } from "@react-three/drei";

// Az önce oluşturduğumuz Drone.jsx dosyasından Model'i import ediyoruz.
// İsmine "Drone" demek için "as" anahtar kelimesini kullanıyoruz.
import { Model as Drone } from "./Drone";

const Experience = () => {
  return (
    <>
      {/* 
        Stage, modelimize hazır bir stüdyo ortamı (ışıklar, zemin, merkezleme) kurar.
        Bu, en iyi sunum için harika bir yardımcıdır.
        environment="city" prop'u ile modele şehir yansımaları ekleyerek gerçekçilik katıyoruz.
      */}
      <Stage environment="city" intensity={0.6} adjustCamera={0.9}>
        <Drone />
      </Stage>

      {/* OrbitControls, fare ile sahneyi kontrol etmemizi sağlar */}
      <OrbitControls
        makeDefault
        autoRotate // Kameranın model etrafında yavaşça dönmesini sağlar
        autoRotateSpeed={0.5}
        minPolarAngle={Math.PI / 4} // Modelin altına girmeyi engeller
        maxPolarAngle={Math.PI / 2}
      />
    </>
  );
};

export default Experience;
