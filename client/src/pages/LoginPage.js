import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const user = {
        email,
        password,
      };

      const res = await axios.post("/api/auth/login", user);

      // BAŞARILI GİRİŞ! Token'ı aldık.
      console.log(res.data.token); // Şimdilik sadece konsola yazdıralım

      // BİR SONRAKİ ADIMDA: Token'ı kaydedip kullanıcıyı Dashboard'a yönlendireceğiz.
      // navigate('/dashboard');
    } catch (err) {
      setError(
        err.response?.data?.msg ||
          "Giriş yapılamadı. Bilgilerinizi kontrol edin."
      );
    }
  };

  return (
    <div>
      <h1>Giriş Yap</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={onSubmit}>
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
            required
          />
        </div>
        <input type="submit" value="Giriş Yap" />
      </form>
    </div>
  );
};

export default LoginPage;
