import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const { username, email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      toast.error("Şifre en az 6 karakter olmalıdır");
      return;
    }

    try {
      const newUser = {
        username,
        email,
        password,
      };

      await axios.post(
        "https://fullstack-xi-khaki.vercel.app/api/auth/register",
        newUser
      );

      toast.success("Kayıt başarılı! Giriş sayfasına yönlendiriliyorsunuz...");

      // Yönlendirmeden önce bildirimin görünmesi için küçük bir gecikme eklemek iyi bir UX pratiğidir
      setTimeout(() => {
        navigate("/login");
      }, 1500); // 1.5 saniye sonra yönlendir
    } catch (err) {
      toast.error(
        err.response?.data?.msg || "Bir hata oluştu. Lütfen tekrar deneyin."
      );
    }
  };

  return (
    <div>
      <h1>Kayıt Ol</h1>
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
