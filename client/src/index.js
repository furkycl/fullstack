import React from "react";
// Hatalı 'client-dom/client' yerine doğru olan 'react-dom/client' kullanılıyor
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

// 'root' elementini seçiyoruz
const rootElement = document.getElementById("root");
// Yeni API'yi kullanarak root'u oluşturuyoruz
const root = ReactDOM.createRoot(rootElement);

// Uygulamayı render ediyoruz
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
