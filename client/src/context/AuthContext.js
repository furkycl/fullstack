import React, { createContext, useReducer, useEffect } from "react";
import authReducer from "./authReducer";
import axios from "axios";
import setAuthToken from "../utils/setAuthToken";

// Başlangıç durumu
const initialState = {
  token: localStorage.getItem("token"), // Uygulama yüklenirken token'ı localStorage'dan al
  isAuthenticated: null,
  user: null,
};

// Context'i oluştur
export const AuthContext = createContext(initialState);

// Provider Bileşeni (Tüm uygulamayı sarmalayacak)
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  // useEffect kullanarak token her değiştiğinde kontrol yap
  useEffect(() => {
    if (state.token) {
      setAuthToken(state.token);
    } else {
      setAuthToken(null);
    }
  }, [state.token]);
  // Eylemler (Actions) - Bileşenlerin çağıracağı fonksiyonlar

  // Giriş Yap
  const login = async (formData) => {
    try {
      const res = await axios.post(
        "https://fullstack-xi-khaki.vercel.app/api/auth/login",
        formData
      );
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: res.data, // res.data = { token: '...' }
      });
    } catch (err) {
      dispatch({ type: "LOGIN_FAIL" });
      // Hatanın LoginPage'de de yakalanabilmesi için tekrar fırlatıyoruz
      throw err;
    }
  };

  // Çıkış Yap
  const logout = () => dispatch({ type: "LOGOUT" });

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        user: state.user, // Değeri dışarıya aç
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
