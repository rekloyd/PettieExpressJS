import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import "../styles/navbar.css";

const Navbar: React.FC = () => {
  useEffect(() => {
    const link = document.createElement("link");
    link.href =
      "https://fonts.googleapis.com/css2?family=Inter:wght@400;500&family=Madimi+One&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-white bg-white pettie-navbar">
      <div className="container-fluid">
        {/* BOTÓN HAMBURGER */}
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
            {/* IZQUIERDA: logo + texto */}
            <Link className="navbar-brand d-flex align-items-center" to="/">
              <img src={logo} alt="Pettie Logo" style={{ width: "120px" }} />
              <span className="pettie-title">Pettie</span>
            </Link>

            {/* CENTRO: enlaces */}
            <ul className="navbar-nav d-flex flex-row" style={{gap:'85px'}}>
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Inicio
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/servicios">
                  Servicios
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/contacto">
                  Contacto
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/nosotros">
                  Sobre Nosotros
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/acerca">
                  Conviertete en Pettier
                </Link>
              </li>
            </ul>
            <div className="d-flex gap-3 align-items-center">
              <Link to="/register" className="btnR">
                Registrarse
              </Link>
              <Link to="/login" className="login-link nav-link margin-login">
                Iniciar sesión
              </Link>
            </div>
          </div>
        </div>
      </div>
      
    </nav>
  );
};

export default Navbar;
