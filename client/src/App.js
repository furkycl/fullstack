import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// Yeni bileşenlerimizi import ediyoruz
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Sayfaları import ediyoruz
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";

import "./App.css";

function App() {
  return (
    <Router>
      {/* div.App yerine React Fragment (<>) kullanarak gereksiz div'den kurtulabiliriz */}
      <>
        <Navbar />
        <main className="container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
          </Routes>
        </main>
        <Footer />
      </>
    </Router>
  );
}

export default App;
