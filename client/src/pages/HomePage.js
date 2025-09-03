import React from "react";
import { Canvas } from "@react-three/fiber";
import Experience from "../components/Experience";

const HomePage = () => {
  return (
    // Canvas'a bir stil vererek sayfanın büyük bir bölümünü kaplamasını sağlıyoruz.
    <div style={{ height: "80vh", width: "100%" }}>
      <Canvas>
        <Experience />
      </Canvas>
    </div>
  );
};

export default HomePage;
