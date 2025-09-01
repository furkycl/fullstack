import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">3D Configurator</Link>
      </div>
      <ul className="navbar-links">
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link to="/login">Giriş Yap</Link>
        </li>
        <li>
          <Link to="/register">Kayıt Ol</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
