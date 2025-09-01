import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <p>
        &copy; {new Date().getFullYear()} 3D Product Configurator. Tüm Hakları
        Saklıdır.
      </p>
    </footer>
  );
};

export default Footer;
