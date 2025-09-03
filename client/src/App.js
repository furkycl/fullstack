import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AnimatedRoutes from "./components/AnimatedRoutes"; // Yeni bileşeni import et
import "./App.css";

function App() {
  return (
    <Router>
      <>
        <Navbar />
        <main className="container">
          {/* Eski <Routes> bloğunun tamamı yerine bu tek satır geldi */}
          <AnimatedRoutes />
        </main>
        <Footer />
      </>
    </Router>
  );
}

export default App;
