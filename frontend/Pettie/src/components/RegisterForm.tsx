import { useState, useEffect } from "react";
import logo from "../assets/logo.png";
import info from "../assets/info.png";
import "../styles/login.css";

export const RegisterForm = () => {
  const [nombreUsuario, setNombreUsuario] = useState("");
  const [email, setEmail] = useState("");
  const [contrasenaUsuario, setContrasenaUsuario] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");
  const [isSelectOpen, setIsSelectOpen] = useState(false);

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
      const response = await fetch(
        "http://localhost:4000/api/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ nombreUsuario, email, contrasenaUsuario, role }),
        }
      );

      const result = await response.json();

      if (response.ok) {
        alert("Registro exitoso");
        window.location.href = "/";
      } else {
        setError(result.message || "Error en el registro.");
      }
    } catch (err) {
      console.error(err);
      setError("Hubo un error al procesar la solicitud.");
    }
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
          justifyContent: "center",
          marginTop: "20px",
        }}
      >
        <img
          src={logo}
          alt="Logo de Pettie"
          style={{ marginBottom: "0px", width: "243px", height: "161px" }}
        />
        <h2
          style={{
            fontFamily: "Madimi One, cursive",
            fontSize: "45px",
            fontWeight: "400",
            margin: "0",
            marginBottom: "80px",
            textAlign: "center",
          }}
        >
          Crea tu cuenta
        </h2>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Nombre de usuario */}
        <div style={{ marginBottom: "1rem" }}>
          <label
            htmlFor="nombreUsuario"
            style={{ display: "block", marginBottom: ".5rem" }}
          >
            Nombre de usuario
          </label>
          <input
            type="text"
            id="nombreUsuario"
            name="nombreUsuario"
            required
            value={nombreUsuario}
            onChange={(e) => setNombreUsuario(e.target.value)}
            style={{
              width: "100%",
              padding: ".75rem",
              fontSize: "1rem",
              borderRadius: "5px",
              border: "black 1px solid",
            }}
          />
        </div>

        {/* Email */}
        <div style={{ marginBottom: "1rem" }}>
          <label
            htmlFor="email"
            style={{ display: "block", marginBottom: ".5rem" }}
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: "100%",
              padding: ".75rem",
              fontSize: "1rem",
              borderRadius: "5px",
              border: "black 1px solid",
            }}
          />
        </div>

        {/* Contraseña */}
        <div style={{ marginBottom: "1rem" }}>
          <label
            htmlFor="contrasenaUsuario"
            style={{ display: "block", marginBottom: ".5rem" }}
          >
            Contraseña
          </label>
          <input
            type="password"
            id="contrasenaUsuario"
            name="contrasenaUsuario"
            required
            value={contrasenaUsuario}
            onChange={(e) => setContrasenaUsuario(e.target.value)}
            style={{
              width: "100%",
              padding: ".75rem",
              fontSize: "1rem",
              borderRadius: "5px",
              border: "black 1px solid",
            }}
          />
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label
            htmlFor="role"
            style={{ display: "block", marginBottom: ".5rem" }}
          >
            Rol
          </label>

          <div style={{ display: "flex", alignItems: "center" }}>
            <select
              id="role"
              className={`custom-select ${isSelectOpen ? 'open' : ''}`}
              name="role"
              required
              value={role}
              onChange={(e) => setRole(e.target.value)}
              onFocus={() => setIsSelectOpen(true)}
              onBlur={() => setIsSelectOpen(false)}
              style={{
                width: "281px",
                padding: ".85rem",
                fontSize: "1rem",
                borderRadius: "5px",
                border: "black 1px solid",
                backgroundColor: "white",
              }}
            >
              <option value="">Selecciona un rol</option>
              <option value="Owner">Owner</option>
              <option value="Pettier">Pettier</option>
            </select>

            <div className="tooltip-wrapper" style={{ marginLeft: "15px", position: "relative", display: "inline-block" }}>
              <img
                src={info}
                alt="info"
                style={{ width: "28px", cursor: "pointer" }}
              />
              <span className="tooltip-text" style={{fontSize: '12px'}}> <b> Pettier:</b> Ofrece servicios de cuidados de mascotas.* <br /> <b>Propietario:</b> Contrata servicios de cuidados de mascotas.*</span>
            </div>
          </div>
        </div>

        {/* Checkboxes */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            marginBottom: "1rem",
          }}
        >
          <label
            style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "14px" }}
          >
            <input
              type="checkbox"
              name="terms"
              required
              style={{ width: "20px", height: "20px", accentColor: "#000" }}
            />
            <a href="/terminos" target="_blank" style={{ color: "black", textDecoration: "none" }}>
              He leído y acepto los <u>términos y condiciones de uso</u><span style={{ color: "red" }}>*</span>
            </a>
          </label>
          <label
            style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "14px" }}
          >
            <input
              type="checkbox"
              name="newsletter"
              style={{ width: "20px", height: "20px", accentColor: "#000" }}
            />
            Acepto recibir emails con promociones y ofertas de Pettie que sean de mi interés
          </label>
        </div>

        {/* Botón y enlace */}
        <div style={{ textAlign: "center" }}>
          <button type="submit" className="btn">
            Regístrate
          </button>
          <br />
          <br />
          <br />
          <p>¿Ya tienes una cuenta?</p>
          <a href="/">Inicia sesión aquí</a>
        </div>

        {error && (
          <p style={{ display: "block", marginTop: "1rem", color: "red" }}>
            {error}
          </p>
        )}
      </form>
    </div>
  );
};