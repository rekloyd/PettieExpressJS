import { useEffect, useState } from "react";

type Rol = "admin" | "owner" | "pettier";

interface Usuario {
  nombreUsuario: string;
  emailUsuario: string;
  cantidadPettieCoins: number;
  role: Rol;
  fechaAltaPlataforma: string;
}

type CamposEditables = "nombreUsuario" | "emailUsuario" | "role";

const Dashboard = () => {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [editando, setEditando] = useState<Record<CamposEditables, boolean>>({
    nombreUsuario: false,
    emailUsuario: false,
    role: false,
  });

  // Formatea una fecha ISO a "día de mes de año"
  const formatearFecha = (fechaISO: string) => {
    const fecha = new Date(fechaISO);
    return fecha.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Carga la fuente de Google sólo una vez
  useEffect(() => {
    const link = document.createElement("link");
    link.href =
      "https://fonts.googleapis.com/css2?family=Inter:wght@400;500&family=Madimi+One&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }, []);

  // Al montar, leo sessionStorage.idUsuario y traigo los datos
  useEffect(() => {
    const idUsuario = sessionStorage.getItem("idUsuario");
    if (!idUsuario) {
      console.error("No se encontró sessionStorage.idUsuario");
      return;
    }

    const fetchUsuario = async () => {
      try {
        const res = await fetch(`http://localhost:4000/api/usuario/${idUsuario}`);
        if (!res.ok) {
          throw new Error(`Error al cargar usuario: ${res.statusText}`);
        }
        const data = await res.json();
        // Mapeo respuesta al estado
        setUsuario({
          nombreUsuario: data.nombreUsuario,
          emailUsuario: data.emailUsuario,
          cantidadPettieCoins: data.cantidadPettieCoins ?? 0,
          role: (data.role ?? "pettier").toLowerCase() as Rol,
          fechaAltaPlataforma: data.fechaAltaPlataforma ?? new Date().toISOString(),
        });
      } catch (err) {
        console.error("Error fetch usuario:", err);
      }
    };

    fetchUsuario();
  }, []);

  const handleChange = (campo: CamposEditables, valor: string) => {
    if (!usuario) return;
    setUsuario({ ...usuario, [campo]: valor });
  };

  const toggleEditar = (campo: CamposEditables) => {
    setEditando({ ...editando, [campo]: !editando[campo] });
  };

  // Mientras carga
  if (!usuario) {
    return <p>Cargando usuario...</p>;
  }

  return (
    <div
      style={{
        fontFamily: "Inter, sans-serif",
        maxWidth: "700px",
        margin: "80px auto",
        padding: "2rem",
        backgroundColor: "#fff",
        borderRadius: "20px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      }}
    >
      <h2
        style={{
          fontFamily: "Madimi One, cursive",
          fontSize: "38px",
          marginBottom: "2rem",
          textAlign: "center",
        }}
      >
        Mis Datos
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 2fr auto",
          gap: "1rem 1rem",
          fontSize: "18px",
          alignItems: "center",
        }}
      >
        {/* Nombre */}
        <strong>Nombre de Usuario:</strong>
        {editando.nombreUsuario ? (
          <input
            value={usuario.nombreUsuario}
            onChange={(e) => handleChange("nombreUsuario", e.target.value)}
            style={{ padding: "0.4rem", fontSize: "16px", width: "100%" }}
          />
        ) : (
          <span>{usuario.nombreUsuario}</span>
        )}
        <button onClick={() => toggleEditar("nombreUsuario")}>
          {editando.nombreUsuario ? "Guardar" : "Editar"}
        </button>

        {/* Email */}
        <strong>Correo:</strong>
        {editando.emailUsuario ? (
          <input
            value={usuario.emailUsuario}
            onChange={(e) => handleChange("emailUsuario", e.target.value)}
            style={{ padding: "0.4rem", fontSize: "16px", width: "100%" }}
          />
        ) : (
          <span>{usuario.emailUsuario}</span>
        )}
        <button onClick={() => toggleEditar("emailUsuario")}>
          {editando.emailUsuario ? "Guardar" : "Editar"}
        </button>

        {/* Rol */}
        <strong>Rol:</strong>
        {editando.role ? (
          <select
            value={usuario.role}
            onChange={(e) => handleChange("role", e.target.value)}
            style={{ padding: "0.4rem", fontSize: "16px" }}
          >
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
        <button onClick={() => toggleEditar("role")}>
          {editando.role ? "Guardar" : "Editar"}
        </button>

        {/* PettieCoins */}
        <strong>PettieCoins:</strong>
        <span>{usuario.cantidadPettieCoins} 🪙</span>
        <span />

        {/* Fecha de alta */}
        <strong>Miembro desde:</strong>
        <span>{formatearFecha(usuario.fechaAltaPlataforma)}</span>
        <span />
      </div>
    </div>
  );
};

export default Dashboard;
