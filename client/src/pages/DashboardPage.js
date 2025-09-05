import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const DashboardPage = () => {
  const { token } = useContext(AuthContext);
  const [configs, setConfigs] = useState([]); // Kullanıcının konfigürasyonlarını tutacak state
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // useEffect, bileşen ilk render edildiğinde çalışır.
  useEffect(() => {
    const fetchConfigs = async () => {
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        // Token, setAuthToken sayesinde isteğe otomatik eklenecek
        const res = await axios.get(
          "https://fullstack-xi-khaki.vercel.app/api/configs"
        );
        setConfigs(res.data);
      } catch (err) {
        setError("Konfigürasyonlar yüklenirken bir hata oluştu.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchConfigs();
  }, [token]); // Bu effect, token değiştiğinde de çalışır

  if (loading) {
    return <p>Yükleniyor...</p>;
  }

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  return (
    <div>
      <h1>Kullanıcı Paneli</h1>
      <h2>Kaydedilen Tasarımlarınız</h2>
      {configs.length === 0 ? (
        <p>Henüz kaydedilmiş bir tasarımınız bulunmuyor.</p>
      ) : (
        <ul>
          {configs.map((config) => (
            <li key={config._id}>
              <strong>{config.name}</strong> - Renk: {config.color}, Materyal:{" "}
              {config.material}
              <small>
                {" "}
                (Oluşturulma: {new Date(config.createdAt).toLocaleDateString()})
              </small>
            </li>
          ))}
        </ul>
      )}
      {/* YENİ KONFİGÜRASYON EKLEME FORMU BURAYA GELECEK */}
    </div>
  );
};

export default DashboardPage;
