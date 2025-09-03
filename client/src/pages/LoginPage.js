import React, { useState, useContext } from "react"; // useContext'i import et
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext"; // AuthContext'i import et

const LoginPage = () => {
  const { login } = useContext(AuthContext); // Context'ten login fonksiyonunu al
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      // Artık doğrudan context'teki login fonksiyonunu çağırıyoruz
      await login({ email, password });

      // Giriş başarılı olduğunda AuthContext durumu güncelleyecek.
      // Kullanıcıyı dashboard'a yönlendiriyoruz.
      navigate("/dashboard");
    } catch (err) {
      setError(
        err.response?.data?.msg ||
          "Giriş yapılamadı. Bilgilerinizi kontrol edin."
      );
    }
  };

  // Form kısmı aynı kalıyor...
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
