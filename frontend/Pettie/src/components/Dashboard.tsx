import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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

  const navigate = useNavigate();

  const formatearFecha = (fechaISO: string) => {
    const fecha = new Date(fechaISO);
    return fecha.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  useEffect(() => {
    const link = document.createElement("link");
    link.href =
      "https://fonts.googleapis.com/css2?family=Inter:wght@400;500&family=Madimi+One&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }, []);

  useEffect(() => {
    const idUsuario = sessionStorage.getItem("idUsuario");
    if (!idUsuario) {
      console.error("No se encontró sessionStorage.idUsuario");
      navigate("/");
      return;
    }

    const fetchUsuario = async () => {
      try {
        const res = await fetch(`http://localhost:4000/api/usuario/${idUsuario}`);
        if (!res.ok) {
          throw new Error(`Error al cargar usuario: ${res.statusText}`);
        }
        const data = await res.json();

        if (!data || !data.nombreUsuario) {
          navigate("/");
          return;
        }

        setUsuario({
          nombreUsuario: data.nombreUsuario,
          emailUsuario: data.emailUsuario,
          cantidadPettieCoins: data.cantidadPettieCoins ?? 0,
          role: (data.role ?? "pettier").toLowerCase() as Rol,
          fechaAltaPlataforma: data.fechaAltaPlataforma ?? new Date().toISOString(),
          contrasenaUsuario: "", // vacía para editar luego
        });
      } catch (err) {
        console.error("Error fetch usuario:", err);
        navigate("/login");
      }
    };

    fetchUsuario();
  }, [navigate]);

  const handleChange = (campo: CamposEditables, valor: string) => {
    if (!usuario) return;
    setUsuario({ ...usuario, [campo]: valor });
  };

  const guardarCampo = async (campo: CamposEditables) => {
    if (!usuario) return;

    const idUsuario = sessionStorage.getItem("idUsuario");
    if (!idUsuario) {
      alert("No se encontró el id de usuario para actualizar");
      return;
    }

    setLoadingCampo((prev) => ({ ...prev, [campo]: true }));

    try {
      const body = { [campo]: usuario[campo] };
      const res = await fetch(`http://localhost:4000/api/usuario/${idUsuario}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Error al actualizar");
      }

      alert("Campo actualizado correctamente");
      setEditando((prev) => ({ ...prev, [campo]: false }));
    } catch (error: unknown) {
      alert("Error al actualizar: " + error);
    } finally {
      setLoadingCampo((prev) => ({ ...prev, [campo]: false }));
    }
  };

  const toggleEditar = (campo: CamposEditables) => {
    if (editando[campo]) {
      guardarCampo(campo);
    } else {
      setEditando({ ...editando, [campo]: true });
    }
  };

  const conseguirMas = () => {
    alert("Aquí puedes implementar la lógica para conseguir más PettieCoins.");
  };

  if (!usuario) {
    return (
      <h1
        style={{
          fontFamily: "Madimi One, cursive",
          fontSize: "38px",
          margin: "200px 0",
          textAlign: "center",
        }}
      >
        Cargando..
      </h1>
    );
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
        <button
          onClick={() => toggleEditar("nombreUsuario")}
          disabled={loadingCampo.nombreUsuario}
        >
          {loadingCampo.nombreUsuario
            ? "Guardando..."
            : editando.nombreUsuario
            ? "Guardar"
            : "Editar"}
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
        <button
          onClick={() => toggleEditar("emailUsuario")}
          disabled={loadingCampo.emailUsuario}
        >
          {loadingCampo.emailUsuario
            ? "Guardando..."
            : editando.emailUsuario
            ? "Guardar"
            : "Editar"}
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
        <button
          onClick={() => toggleEditar("role")}
          disabled={loadingCampo.role}
        >
          {loadingCampo.role
            ? "Guardando..."
            : editando.role
            ? "Guardar"
            : "Editar"}
        </button>

        {/* Contraseña */}
        <strong>Contraseña:</strong>
        {editando.contrasenaUsuario ? (
          <input
            type="text"
            value={usuario.contrasenaUsuario || ""}
            onChange={(e) => handleChange("contrasenaUsuario", e.target.value)}
            style={{ padding: "0.4rem", fontSize: "16px", width: "100%" }}
            placeholder="Escribe nueva contraseña"
          />
        ) : (
          <span>********</span>
        )}
        <button
          onClick={() => toggleEditar("contrasenaUsuario")}
          disabled={loadingCampo.contrasenaUsuario}
        >
          {loadingCampo.contrasenaUsuario
            ? "Guardando..."
            : editando.contrasenaUsuario
            ? "Guardar"
            : "Editar"}
        </button>

        {/* PettieCoins */}
        <strong>PettieCoins:</strong>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span>{usuario.cantidadPettieCoins} 🪙</span>
          <button
            onClick={conseguirMas}
            style={{
              cursor: "pointer",
              padding: "0.4rem 0.8rem",
              fontSize: "14px",
              borderRadius: "6px",
              border: "none",
              backgroundColor: "#007bff",
              color: "#fff",
              fontWeight: "500",
              transition: "background-color 0.3s",
            }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#0056b3")}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#007bff")}
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
    </div>
  );
};

export default Dashboard;
