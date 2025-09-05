import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./Navbar.css";

const Navbar = () => {
  // Context'ten gerekli değerleri ve fonksiyonları al
  // NOT: 'isAuthenticated' token varlığına bağlı olacağı için
  // doğrudan token'ı kontrol etmek daha güvenilirdir.
  const { token, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const onLogout = () => {
    logout(); // Context'teki logout fonksiyonunu çağır
    navigate("/login"); // Kullanıcıyı giriş sayfasına yönlendir
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">3D Configurator</Link>
      </div>
      <ul className="navbar-links">
        {/*
          Koşullu render'ı doğrudan JSX içinde yapıyoruz.
          Bu, React için en temiz ve en anlaşılır yöntemdir.
        */}
        {token ? (
          // Eğer token varsa (kullanıcı giriş yapmışsa)
          <>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li>
              {/* href='#!' yerine doğrudan bir buton kullanmak daha doğru bir yaklaşımdır */}
              <button onClick={onLogout} className="logout-button">
                Çıkış Yap
              </button>
            </li>
          </>
        ) : (
          // Eğer token yoksa (ziyaretçi ise)
          <>
            <li>
              <Link to="/login">Giriş Yap</Link>
            </li>
            <li>
              <Link to="/register">Kayıt Ol</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
