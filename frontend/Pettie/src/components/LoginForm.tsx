import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import logo from "../assets/logo.png";
import "../styles/login.css";

interface LoginFormProps {
  onLoginSuccess: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLoginSuccess }) => {
  const [nombreUsuario, setNombreUsuario] = useState("");
  const [contrasenaUsuario, setContrasenaUsuario] = useState("");
  const [error, setError] = useState("");
  const [mostrarContrasena, setMostrarContrasena] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const link = document.createElement("link");
    link.href =
      "https://fonts.googleapis.com/css2?family=Inter:wght@400;500&family=Madimi+One&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:4000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombreUsuario, contrasenaUsuario }),
      });
      const result = await response.json();

      if (response.ok) {
        const { idUsuario } = result.usuario;
        sessionStorage.setItem("idUsuario", idUsuario.toString());
        onLoginSuccess();
        navigate("/");
      } else {
        setError(result.message);
      }
    } catch {
      setError("Credenciales incorrectas, inténtalo de nuevo.");
    }
  };

  const toggleMostrarContrasena = () => {
    setMostrarContrasena(prev => !prev);
  };

  return (
    <div
      style={{
        fontFamily: "Inter, sans-serif",
        maxWidth: "600px",
        margin: "auto",
        padding: "1rem",
        fontSize: "20px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "80px",
        }}
      >
        <Link to="/">
          <img
            src={logo}
            alt="Logo de Pettie"
            style={{
              marginBottom: "20px",
              width: "243px",
              height: "161px",
              cursor: "pointer",
            }}
          />
        </Link>
        <h2
          style={{
            fontFamily: "Madimi One, cursive",
            fontSize: "45px",
            fontWeight: 400,
            margin: "0 0 80px",
            textAlign: "center",
          }}
        >
          🐾 Inicia sesión en Pettie
        </h2>
      </div>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="nombreUsuario" style={{ display: "block", marginBottom: ".5rem" }}>
            👤 Nombre de usuario
          </label>
          <input
            type="text"
            id="nombreUsuario"
            required
            value={nombreUsuario}
            onChange={e => setNombreUsuario(e.target.value)}
            style={{
              width: "100%",
              padding: ".75rem",
              fontSize: "1rem",
              borderRadius: "5px",
              border: "1px solid black",
            }}
          />
        </div>

        <div style={{ marginBottom: "1rem", position: "relative" }}>
          <label htmlFor="contrasenaUsuario" style={{ display: "block", marginBottom: ".5rem" }}>
            🔒 Contraseña
          </label>
          <input
            type={mostrarContrasena ? "text" : "password"}
            id="contrasenaUsuario"
            required
            value={contrasenaUsuario}
            onChange={e => setContrasenaUsuario(e.target.value)}
            style={{
              width: "100%",
              padding: ".75rem 2.5rem .75rem .75rem",
              fontSize: "1rem",
              borderRadius: "5px",
              border: "1px solid black",
            }}
          />
          <span
            onClick={toggleMostrarContrasena}
            style={{
              position: "absolute",
              right: "10px",
              top: "55%",
              cursor: "pointer",
              opacity: 0.7,
              userSelect: "none",
              fontSize: "1.2rem",
            }}
            aria-label={mostrarContrasena ? "Ocultar contraseña" : "Mostrar contraseña"}
            role="button"
          >
            {mostrarContrasena ? "🙈" : "👁️"}
          </span>
        </div>

        <div style={{ textAlign: "center" }}>
          <button type="submit" className="btnLogin">
            🚪 Iniciar sesión
          </button>
          <p style={{ marginTop: "1rem" }}>
            ¿Todavía no tienes cuenta? <Link to="/register">📝 Regístrate aquí</Link>
          </p>
        </div>

        {error && <p style={{ color: "red", marginTop: "1rem" }}>{error}</p>}
      </form>
    </div>
  );
};

export default LoginForm;
