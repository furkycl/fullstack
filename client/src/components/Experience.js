import React from "react";
import { Stage, OrbitControls } from "@react-three/drei";
import { Model as Drone } from "./Drone";

// Bileşenin artık 'selectedColor' adında bir prop aldığını belirtiyoruz
const Experience = ({ selectedColor }) => {
  return (
    <>
      <Stage environment="city" intensity={0.6} adjustCamera={0.9}>
        {/* Drone'a da gelen rengi prop olarak iletiyoruz */}
        <Drone color={selectedColor} />
      </Stage>

      <OrbitControls
        makeDefault
        autoRotate
        autoRotateSpeed={0.5}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 2}
      />
    </>
  );
};

export default Experience;
