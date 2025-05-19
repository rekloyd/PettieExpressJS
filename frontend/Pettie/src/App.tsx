import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Terminos from "./components/Terminos";
import Contacto from "./components/Contacto";
import Nosotros from "./components/Nosotros";
import HeroComponent from "./components/HeroComponent";
import Servicio from "./components/Servicio";
import Dashboard from "./components/Dashboard";
import Checkout from "./components/Checkout";
import DashboardPorId from "./components/DashboardCompleto";
import Blog from "./components/Blog";
import AdminDashboard from "./components/AdminDashboard";

function App() {
  const [refreshNavbarKey, setRefreshNavbarKey] = useState(0);

  const handleLoginSuccess = () => {
    setRefreshNavbarKey((k) => k + 1);
  };

  return (
    <BrowserRouter>
      <Navbar key={refreshNavbarKey} />
      <Routes>
        <Route path="/" element={<HeroComponent />} />
        <Route path="/login" element={<LoginForm onLoginSuccess={handleLoginSuccess} />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/terminos" element={<Terminos />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/nosotros" element={<Nosotros />} />
        <Route path="/servicios" element={<Servicio />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/pasarelaDePago" element={<Checkout />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/dashboard/:id" element={<DashboardPorId />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
