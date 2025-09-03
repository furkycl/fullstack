import React, { createContext, useReducer } from "react";
import authReducer from "./authReducer";
import axios from "axios";

// Başlangıç durumu
const initialState = {
  token: localStorage.getItem("token"), // Uygulama yüklenirken token'ı localStorage'dan al
  isAuthenticated: null,
};

// Context'i oluştur
export const AuthContext = createContext(initialState);

// Provider Bileşeni (Tüm uygulamayı sarmalayacak)
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Eylemler (Actions) - Bileşenlerin çağıracağı fonksiyonlar

  // Giriş Yap
  const login = async (formData) => {
    try {
      const res = await axios.post("/api/auth/login", formData);
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
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
