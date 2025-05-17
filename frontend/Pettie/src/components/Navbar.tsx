// src/components/Navbar.tsx
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import "../styles/navbar.css";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  // Estado para forzar re-render cuando cambie sessionStorage
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(
    Boolean(sessionStorage.getItem("idUsuario"))
  );

  // Carga de la fuente
  useEffect(() => {
    const link = document.createElement("link");
    link.href =
      "https://fonts.googleapis.com/css2?family=Inter:wght@400;500&family=Madimi+One&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }, []);

  // Escuchar cambios en sessionStorage (ej. desde otras pestañas)
  useEffect(() => {
    const onStorage = () => {
      setIsLoggedIn(Boolean(sessionStorage.getItem("idUsuario")));
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  // Función de logout
  const handleLogout = () => {
    sessionStorage.removeItem("idUsuario");
    setIsLoggedIn(false);
    navigate("/"); // redirigir a inicio tras cerrar sesión
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-white bg-white pettie-navbar">
      <div className="container-fluid">
        {/* HAMBURGER */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#pettieNavbar"
          aria-controls="pettieNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse w-100" id="pettieNavbar">
          <div className="d-flex w-100 justify-content-between align-items-center">
            {/* IZQUIERDA */}
            <Link className="navbar-brand d-flex align-items-center" to="/">
              <img src={logo} alt="Pettie Logo" style={{ width: "120px" }} />
              <span className="pettie-title">Pettie</span>
            </Link>

            {/* CENTRO */}
            <ul className="navbar-nav d-flex flex-row" style={{ gap: "85px" }}>
              <li className="nav-item">
                <Link className="nav-link" to="/">Inicio</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/servicios">Servicios</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/contacto">Contacto</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/nosotros">Sobre Nosotros</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/blog">Blog</Link>
              </li>
            </ul>

            {/* DERECHA */}
            {!isLoggedIn ? (
              <div className="d-flex gap-3 align-items-center">
                <Link to="/register" className="btnR">
                  Registrarse
                </Link>
                <Link to="/login" className="login-link nav-link margin-login">
                  Iniciar sesión
                </Link>
              </div>
            ) : (
              <div className="d-flex gap-3 align-items-center">
                <Link to="/dashboard" className="btn btn-outline-primary">
                  Mi Cuenta
                </Link>
                <button
                  onClick={handleLogout}
                  className="btn"
                  type="button"
                >
                  Cerrar Sesión
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
