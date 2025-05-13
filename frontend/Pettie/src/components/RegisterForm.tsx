import { useState, useEffect } from "react";
import logo from "../assets/logo.png";
import info from "../assets/info.png";
import "../styles/login.css";

export const RegisterForm = () => {
  const [nombreUsuario, setNombreUsuario] = useState("");
  const [email, setEmail] = useState("");
  const [contrasenaUsuario, setContrasenaUsuario] = useState("");
  const [role, setRole] = useState("");
  const [numeroCuenta, setNumeroCuenta] = useState("");
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

    // Validar que si es pettier, numeroCuenta no esté vacío
    if (role === "pettier" && !numeroCuenta.trim()) {
      setError("El número de cuenta es obligatorio para rol Pettier");
      return;
    }

    const payload = {
      nombreUsuario,
      emailUsuario: email,
      contrasenaUsuario,
      cantidadPettieCoins: 0,
      role,
      fechaAltaPlataforma: new Date().toISOString().split("T")[0], // YYYY-MM-DD
      ...(role === "pettier" ? { numeroCuenta } : {}),
    };

    try {
      const response = await fetch("http://localhost:4000/api/usuario/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      if (response.ok) {
        alert("Registro exitoso, ID usuario: " + result.idUsuario);
        window.location.href = "/";
      } else {
        setError(result.error || "Error en el registro.");
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
      {/* Cabecera */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "20px",
        }}
      >
        <img
          src={logo}
          alt="Logo de Pettie"
          style={{ marginBottom: "0", width: "243px", height: "161px" }}
        />
        <h2
          style={{
            fontFamily: "Madimi One, cursive",
            fontSize: "45px",
            fontWeight: "400",
            margin: "0 0 80px",
            textAlign: "center",
          }}
        >
          Crea tu cuenta
        </h2>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Nombre de usuario */}
        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="nombreUsuario" style={{ display: "block", marginBottom: ".5rem" }}>
            Nombre de usuario
          </label>
          <input
            type="text"
            id="nombreUsuario"
            required
            value={nombreUsuario}
            onChange={(e) => setNombreUsuario(e.target.value)}
            style={{ width: "100%", padding: ".75rem", fontSize: "1rem", borderRadius: "5px", border: "1px solid black" }}
          />
        </div>

        {/* Email */}
        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="email" style={{ display: "block", marginBottom: ".5rem" }}>
            Email
          </label>
          <input
            type="email"
            id="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: "100%", padding: ".75rem", fontSize: "1rem", borderRadius: "5px", border: "1px solid black" }}
          />
        </div>

        {/* Contraseña */}
        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="contrasenaUsuario" style={{ display: "block", marginBottom: ".5rem" }}>
            Contraseña
          </label>
          <input
            type="password"
            id="contrasenaUsuario"
            required
            value={contrasenaUsuario}
            onChange={(e) => setContrasenaUsuario(e.target.value)}
            style={{ width: "100%", padding: ".75rem", fontSize: "1rem", borderRadius: "5px", border: "1px solid black" }}
          />
        </div>

        {/* Rol y tooltip */}
        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="role" style={{ display: "block", marginBottom: ".5rem" }}>
            Rol
          </label>
          <div style={{ display: "flex", alignItems: "center" }}>
            <select
              id="role"
              className={`custom-select ${isSelectOpen ? "open" : ""}`}
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
                border: "1px solid black",
                backgroundColor: "white",
              }}
            >
              <option value="">Selecciona un rol</option>
              <option value="admin" style={{display: 'none'}}>Admin</option>
              <option value="owner">Owner</option>
              <option value="pettier">Pettier</option>
            </select>
            <div className="tooltip-wrapper" style={{ marginLeft: "15px", position: "relative", display: "inline-block" }}>
              <img src={info} alt="info" style={{ width: "28px", cursor: "pointer" }} />
              <span className="tooltip-text">Elige el tipo de usuario</span>
            </div>
          </div>
        </div>

        {/* Cuenta bancaria para Pettier */}
        {role === "pettier" && (
          <div style={{ marginBottom: "1rem" }}>
            <label htmlFor="numeroCuenta" style={{ display: "block", marginBottom: ".5rem" }}>
              Número de cuenta
            </label>
            <input
              type="text"
              id="numeroCuenta"
              required
              value={numeroCuenta}
              onChange={(e) => setNumeroCuenta(e.target.value)}
              style={{ width: "100%", padding: ".75rem", fontSize: "1rem", borderRadius: "5px", border: "1px solid black" }}
            />
          </div>
        )}

        {/* Checkboxes */}
        <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "1rem" }}>
          <label style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "14px" }}>
            <input type="checkbox" name="terms" required style={{ width: "20px", height: "20px", accentColor: "#000" }} />
            He leído y acepto los <a href="/terminos" target="_blank">términos y condiciones</a> <span style={{ color: "red" }}>*</span>
          </label>
          <label style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "14px" }}>
            <input type="checkbox" name="newsletter" style={{ width: "20px", height: "20px", accentColor: "#000" }} />
            Deseo recibir promociones por correo electrónico
          </label>
        </div>

        {/* Botón de registro */}
        <div style={{ textAlign: "center" }}>
          <button type="submit" className="btn">Regístrate</button>
          <p style={{ marginTop: "1rem" }}>¿Ya tienes una cuenta? <a href="/">Inicia sesión</a></p>
        </div>

        {/* Error */}
        {error && <p style={{ color: "red", marginTop: "1rem" }}>{error}</p>}
      </form>
    </div>
  );
};
