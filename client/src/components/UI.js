import React from "react";

const UI = ({ onColorChange }) => {
  // Projemizde kullanacağımız renk paleti
  const colors = [
    "#f0f8ff",
    "#ffd700",
    "#ff4500",
    "#2e8b57",
    "#4682b4",
    "#333333",
  ];

  return (
    <div
      style={{
        position: "absolute",
        top: "20px",
        left: "20px",
        zIndex: 1, // Canvas'ın üzerinde görünmesini sağlar
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "rgba(255, 255, 255, 0.5)",
        padding: "10px",
        borderRadius: "10px",
      }}
    >
      <h3>Renk Seçimi</h3>
      <div style={{ display: "flex", gap: "10px" }}>
        {colors.map((color) => (
          <div
            key={color}
            style={{
              backgroundColor: color,
              width: "30px",
              height: "30px",
              borderRadius: "50%",
              cursor: "pointer",
              border: "2px solid white",
            }}
            // Bir renk kutusuna tıklandığında onColorChange fonksiyonunu çağırır
            onClick={() => onColorChange(color)}
          />
        ))}
      </div>
    </div>
  );
};

export default UI;
