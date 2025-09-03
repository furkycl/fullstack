import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { username, email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Önceki hataları temizle

    if (password.length < 6) {
      setError("Şifre en az 6 karakter olmalıdır");
      return;
    }

    try {
      const newUser = {
        username,
        email,
        password,
      };

      // Backend API'mize POST isteği gönderiyoruz
      // Not: package.json'a proxy ekleyince '/api/auth/register' olarak kısaltacağız
      await axios.post("/api/auth/register", newUser);

      // Kayıt başarılıysa, kullanıcıyı giriş sayfasına yönlendir
      navigate("/login");
    } catch (err) {
      // err.response.data backend'den gelen JSON hatasını içerir (örn: {msg: '...'})
      setError(
        err.response?.data?.msg || "Bir hata oluştu. Lütfen tekrar deneyin."
      );
    }
  };

  return (
    <div>
      <h1>Kayıt Ol</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={onSubmit}>
        <div>
          <input
            type="text"
            placeholder="Kullanıcı Adı"
            name="username"
            value={username}
            onChange={onChange}
            required
          />
        </div>
        <div>
          <input
            type="email"
            placeholder="Email Adresi"
            name="email"
            value={email}
            onChange={onChange}
            required
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Şifre"
            name="password"
            value={password}
            onChange={onChange}
            minLength="6"
            required
          />
        </div>
        <input type="submit" value="Kayıt Ol" />
      </form>
    </div>
  );
};

export default RegisterPage;
