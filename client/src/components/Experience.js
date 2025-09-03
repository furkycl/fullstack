import React from "react";
import { OrbitControls } from "@react-three/drei";

const Experience = () => {
  return (
    <>
      {/* OrbitControls, fare ile sahneyi döndürmemizi, zoom yapmamızı sağlar */}
      <OrbitControls />

      {/* Işıklar olmadan 3D objeler görünmez. Bu temel bir ortam ışığıdır. */}
      <ambientLight intensity={0.5} />

      {/* Bu da sahneye belirli bir yönden vuran bir spot ışığıdır. */}
      <directionalLight position={[10, 10, 5]} intensity={1} />

      {/* Sahnemizin yıldızı: Bir küp! */}
      <mesh>
        {/* Küpün geometrisi (şekli). Boyutlarını 1x1x1 olarak belirledik. */}
        <boxGeometry args={[1, 1, 1]} />

        {/* Küpün materyali (yüzeyi). Şimdilik standart bir materyal. */}
        <meshStandardMaterial color="mediumpurple" />
      </mesh>
    </>
  );
};

export default Experience;
