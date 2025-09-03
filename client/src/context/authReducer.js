const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      // Token'ı tarayıcının yerel deposuna (localStorage) kaydediyoruz.
      // Bu sayede kullanıcı sayfayı yenilese veya tarayıcıyı kapatıp açsa bile token kalır.
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        isAuthenticated: true,
        token: action.payload.token,
      };
    case "REGISTER_SUCCESS":
    case "LOGIN_FAIL":
    case "REGISTER_FAIL":
    case "LOGOUT":
      // Başarısızlık durumunda veya çıkış yapıldığında token'ı temizle
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
      };
    default:
      return state;
  }
};

export default authReducer;
