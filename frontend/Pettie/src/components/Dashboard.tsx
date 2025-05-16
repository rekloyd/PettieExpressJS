import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { validarContrasena } from "../utils/validarContrasena";
import MascotaPorId from "./MascotaPorId";
import CrearMascota from "./CrearMascota";
import ServiciosOfrecidosComponent from "./ServiciosOfrecidosComponent";

type Rol = "admin" | "owner" | "pettier";

interface Usuario {
  nombreUsuario: string;
  emailUsuario: string;
  cantidadPettieCoins: number;
  role: Rol;
  fechaAltaPlataforma: string;
  contrasenaUsuario: string;
}

type CamposEditables = "nombreUsuario" | "emailUsuario" | "role" | "contrasenaUsuario";

const Dashboard = () => {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [editando, setEditando] = useState<Record<CamposEditables, boolean>>({
    nombreUsuario: false,
    emailUsuario: false,
    role: false,
    contrasenaUsuario: false,
  });
  const [loadingCampo, setLoadingCampo] = useState<Record<CamposEditables, boolean>>({
    nombreUsuario: false,
    emailUsuario: false,
    role: false,
    contrasenaUsuario: false,
  });
  const [errorContrasena, setErrorContrasena] = useState<string>("");

  const navigate = useNavigate();

  const formatearFecha = (fechaISO: string) =>
    new Date(fechaISO).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Inter:wght@400;500&family=Madimi+One&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }, []);

  useEffect(() => {
    const idUsuario = sessionStorage.getItem("idUsuario");
    if (!idUsuario) {
      navigate("/");
      return;
    }

    (async () => {
      try {
        const res = await fetch(`http://localhost:4000/api/usuario/${idUsuario}`);
        if (!res.ok) throw new Error(res.statusText);
        const data = await res.json();
        if (!data.nombreUsuario) {
          navigate("/");
          return;
        }
        setUsuario({
          nombreUsuario: data.nombreUsuario,
          emailUsuario: data.emailUsuario,
          cantidadPettieCoins: data.cantidadPettieCoins ?? 0,
          role: (data.role ?? "pettier").toLowerCase() as Rol,
          fechaAltaPlataforma: data.fechaAltaPlataforma ?? new Date().toISOString(),
          contrasenaUsuario: "",
        });
      } catch {
        navigate("/login");
      }
    })();
  }, [navigate]);

  const handleChange = (campo: CamposEditables, valor: string) => {
    if (!usuario) return;
    setUsuario({ ...usuario, [campo]: valor });
    if (campo === "contrasenaUsuario") {
      // limpiar error al modificar
      setErrorContrasena("");
    }
  };

  const guardarCampo = async (campo: CamposEditables) => {
    if (!usuario) return;

    // Validación de contraseña
    if (campo === "contrasenaUsuario") {
      if (!validarContrasena(usuario.contrasenaUsuario)) {
        setErrorContrasena(
          "La contraseña debe tener al menos 8 caracteres, 1 mayúscula, 1 minúscula y 1 símbolo especial."
        );
        return;
      }
    }

    const idUsuario = sessionStorage.getItem("idUsuario");
    if (!idUsuario) {
      alert("No se encontró el id de usuario para actualizar");
      return;
    }

    setLoadingCampo(prev => ({ ...prev, [campo]: true }));

    try {
      const body = { [campo]: usuario[campo] };
      const res = await fetch(`http://localhost:4000/api/usuario/${idUsuario}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Error al actualizar");
      }
      alert("Campo actualizado correctamente");
      setEditando(prev => ({ ...prev, [campo]: false }));
    } catch (e: unknown) {
      alert("Error al actualizar: " + e);
    } finally {
      setLoadingCampo(prev => ({ ...prev, [campo]: false }));
    }
  };

  const toggleEditar = (campo: CamposEditables) => {
    if (editando[campo]) {
      guardarCampo(campo);
    } else {
      setEditando(prev => ({ ...prev, [campo]: true }));
    }
  };

  const conseguirMas = () => {
     navigate('/pasarelaDePago');
  };

  if (!usuario) {
    return (
      <h1 style={{ fontFamily: "Madimi One, cursive", fontSize: 38, margin: "200px 0", textAlign: "center" }}>
        Cargando..
      </h1>
    );
  }

  return (
    <div style={{ fontFamily: "Inter, sans-serif", maxWidth: 700, margin: "80px auto", padding: "2rem", backgroundColor: "#fff", borderRadius: 20, boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
      <h2 style={{ fontFamily: "Madimi One, cursive", fontSize: 38, marginBottom: "2rem", textAlign: "center" }}>
        Mis Datos
      </h2>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr auto", gap: "1rem 1rem", fontSize: 18, alignItems: "center" }}>
        {/* Nombre */}
        <strong>Nombre de Usuario:</strong>
        {editando.nombreUsuario ? (
          <input
            value={usuario.nombreUsuario}
            onChange={e => handleChange("nombreUsuario", e.target.value)}
            style={{ padding: "0.4rem", fontSize: 16, width: "100%" }}
          />
        ) : (
          <span>{usuario.nombreUsuario}</span>
        )}
        <button onClick={() => toggleEditar("nombreUsuario")} disabled={loadingCampo.nombreUsuario}>
          {loadingCampo.nombreUsuario ? "Guardando..." : editando.nombreUsuario ? "Guardar" : "Editar"}
        </button>

        {/* Email */}
        <strong>Correo:</strong>
        {editando.emailUsuario ? (
          <input
            value={usuario.emailUsuario}
            onChange={e => handleChange("emailUsuario", e.target.value)}
            style={{ padding: "0.4rem", fontSize: 16, width: "100%" }}
          />
        ) : (
          <span>{usuario.emailUsuario}</span>
        )}
        <button onClick={() => toggleEditar("emailUsuario")} disabled={loadingCampo.emailUsuario}>
          {loadingCampo.emailUsuario ? "Guardando..." : editando.emailUsuario ? "Guardar" : "Editar"}
        </button>

        {/* Rol */}
        <strong>Rol:</strong>
        {editando.role ? (
          <select value={usuario.role} onChange={e => handleChange("role", e.target.value as Rol)} style={{ padding: "0.4rem", fontSize: 16 }}>
            <option value="owner">Propietario</option>
            <option value="pettier">Pettier</option>
            <option value="admin">Administrador</option>
          </select>
        ) : (
          <span>
            {usuario.role === "owner"
              ? "Propietario"
              : usuario.role === "pettier"
              ? "Pettier"
              : "Administrador"}
          </span>
        )}
        <button onClick={() => toggleEditar("role")} disabled={loadingCampo.role}>
          {loadingCampo.role ? "Guardando..." : editando.role ? "Guardar" : "Editar"}
        </button>

        {/* Contraseña */}
        <strong>Contraseña:</strong>
        {editando.contrasenaUsuario ? (
          <>
            <input
              type="text"
              value={usuario.contrasenaUsuario}
              onChange={e => handleChange("contrasenaUsuario", e.target.value)}
              style={{ padding: "0.4rem", fontSize: 16, width: "100%" }}
              placeholder="Escribe nueva contraseña"
            />
            {errorContrasena && <p style={{ color: "red", margin: 0 }}>{errorContrasena}</p>}
          </>
        ) : (
          <span>********</span>
        )}
        <button onClick={() => toggleEditar("contrasenaUsuario")} disabled={loadingCampo.contrasenaUsuario}>
          {loadingCampo.contrasenaUsuario ? "Guardando..." : editando.contrasenaUsuario ? "Guardar" : "Editar"}
        </button>

        {/* PettieCoins */}
        <strong>PettieCoins:</strong>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span>{usuario.cantidadPettieCoins} 🪙</span>
          <button
            onClick={conseguirMas}
            style={{ cursor: "pointer", padding: "0.4rem 0.8rem", fontSize: 14, borderRadius: 6, border: "none", backgroundColor: "#007bff", color: "#fff", fontWeight: 500, transition: "background-color 0.3s" }}
            onMouseOver={e => (e.currentTarget.style.backgroundColor = "#0056b3")}
            onMouseOut={e => (e.currentTarget.style.backgroundColor = "#007bff")}
          >
            Conseguir más PettieCoins
          </button>
        </div>
        <span />

        {/* Fecha de alta */}
        <strong>Miembro desde:</strong>
        <span>{formatearFecha(usuario.fechaAltaPlataforma)}</span>
        <span />
      </div>

      {usuario.role === "pettier" && <ServiciosOfrecidosComponent />}


      {usuario.role === "pettier" && <ServiciosOfrecidosComponent /> }
      {usuario.role === "owner" && (
  <div>
    <MascotaPorId />
    <CrearMascota />
  </div>
)}
      
    </div>
  );
};

export default Dashboard;
