import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

type Rol = "admin" | "owner" | "pettier";

interface Usuario {
  nombreUsuario: string;
  role: Rol;
  fechaAltaPlataforma: string;
}

const DashboardPorId = () => {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const navigate = useNavigate();
  const { id } = useParams();

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
    if (!id) {
      navigate("/");
      return;
    }

    (async () => {
      try {
        const res = await fetch(`http://localhost:4000/api/usuario/${id}`);
        if (!res.ok) throw new Error(res.statusText);
        const data = await res.json();
        if (!data.nombreUsuario) {
          navigate("/");
          return;
        }
        setUsuario({
          nombreUsuario: data.nombreUsuario,
          role: (data.role ?? "pettier").toLowerCase() as Rol,
          fechaAltaPlataforma: data.fechaAltaPlataforma ?? new Date().toISOString(),
        });
      } catch {
        navigate("/login");
      }
    })();
  }, [id, navigate]);

  if (!usuario) {
    return (
      <h1 style={{ fontFamily: "Madimi One, cursive", fontSize: 38, margin: "200px 0", textAlign: "center" }}>
        Cargando perfil...
      </h1>
    );
  }

  const traducirRol = (rol: Rol) => {
    switch (rol) {
      case "admin":
        return "Administrador";
      case "owner":
        return "Propietario";
      case "pettier":
      default:
        return "Pettier";
    }
  };

  return (
    <div style={{
      fontFamily: "Inter, sans-serif",
      maxWidth: 600,
      margin: "80px auto",
      padding: "2.5rem",
      backgroundColor: "#fdfdfd",
      borderRadius: "20px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      textAlign: "center"
    }}>
      <div style={{ marginBottom: "2rem" }}>
        <h1 style={{ fontFamily: "Madimi One, cursive", fontSize: 42, margin: 0 }}>{usuario.nombreUsuario}</h1>
        <p style={{ fontSize: 18, color: "#666"}}>{traducirRol(usuario.role)}</p>
      </div>

      <div>
        <h3 style={{ fontSize: 16, color: "#999", marginBottom: 4 }}>Miembro desde</h3>
        <p style={{ fontSize: 18 }}>{formatearFecha(usuario.fechaAltaPlataforma)}</p>
      </div>
    </div>
  );
};

export default DashboardPorId;
