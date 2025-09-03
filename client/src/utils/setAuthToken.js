import axios from "axios";

// Bu fonksiyon, bir token alır ve eğer token varsa,
// tüm axios isteklerinin başlığına bu token'ı ekler.
// Eğer token yoksa, bu başlığı siler.
const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};

export default setAuthToken;
