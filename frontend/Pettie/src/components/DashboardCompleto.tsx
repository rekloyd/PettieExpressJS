import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

type Rol = "admin" | "owner" | "pettier";

interface Usuario {
  nombreUsuario: string;
  role: Rol;
  fechaAltaPlataforma: string;
}

interface Mascota {
  idMascota: number;
  nombreMascota: string;
  tamanoMascota: string | null;
  cuidadosEspeciales: string | null;
  paseoManana: boolean;
  paseoMedioDia: boolean;
  paseoTarde: boolean;
  razaPerro: string | null;
  razaGato: string | null;
}

interface ServicioOfrecido {
  idActividad: number;
  tipoActividad: string;
  fechaInicio: string;
  fechaFinal: string;
  precio: number;
  animalesAdmitidos: "pequeno" | "mediano" | "grande";
}


const buttonStyle = {
  border: '1px solid black',
  width: '150px',
  height: '35px',
  borderRadius: '5px',
  backgroundColor: 'rgb(247, 169, 82)',
  marginBottom: '4px',
};


const DashboardCompleto = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [mascotas, setMascotas] = useState<Mascota[]>([]);
  const [serviciosOfrecidos, setServiciosOfrecidos] = useState<ServicioOfrecido[]>([]);

  const formatearFecha = (fechaISO: string) =>
    new Date(fechaISO).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

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

  useEffect(() => {
    const link = document.createElement("link");
    link.href =
      "https://fonts.googleapis.com/css2?family=Inter:wght@400;500&family=Madimi+One&display=swap";
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
        const userRes = await fetch(`http://localhost:4000/api/usuario/${id}`);
        if (!userRes.ok) throw new Error();

        const userData = await userRes.json();

        if (!userData.nombreUsuario) {
          navigate("/");
          return;
        }

        const role: Rol = (userData.role ?? "pettier").toLowerCase();

        setUsuario({
          nombreUsuario: userData.nombreUsuario,
          role,
          fechaAltaPlataforma: userData.fechaAltaPlataforma ?? new Date().toISOString(),
        });

        if (role === "owner") {
          const mascotasRes = await fetch(`http://localhost:4000/api/mascotas/owner/${id}`);
          if (!mascotasRes.ok) throw new Error();
          const mascotasData = await mascotasRes.json();
          setMascotas(mascotasData);
        }

        if (role === "pettier") {
          const serviciosRes = await fetch(`http://localhost:4000/api/serviciosOfrecidos?idPettier=${id}`);
          if (!serviciosRes.ok) throw new Error();
          const serviciosData = await serviciosRes.json();
          setServiciosOfrecidos(serviciosData);
        }
      } catch {
        navigate("/login");
      }
    })();
  }, [id, navigate]);

  if (!usuario) {
    return (
      <h1
        style={{
          fontFamily: "Madimi One, cursive",
          fontSize: 38,
          margin: "200px 0",
          textAlign: "center",
        }}
      >
        Cargando perfil...
      </h1>
    );
  }

  return (
    <div
      style={{
        fontFamily: "Inter, sans-serif",
        maxWidth: 1200,
        margin: "60px auto",
        padding: "2rem",
      }}
    >
      {/* Panel de Usuario */}
      <div
        style={{
          maxWidth: 600,
          margin: "0 auto 60px",
          padding: "2rem",
          backgroundColor: "#fdfdfd",
          borderRadius: "20px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          textAlign: "center",
        }}
      >
        <h1 style={{ fontFamily: "Madimi One, cursive", fontSize: 42 }}>
          {usuario.nombreUsuario}
        </h1>
        <p style={{ fontSize: 18, color: "#666" }}>
          {traducirRol(usuario.role)}
        </p>
        <h3 style={{ fontSize: 16, color: "#999", marginTop: 16 }}>
          Miembro desde
        </h3>
        <p style={{ fontSize: 18 }}>
          {formatearFecha(usuario.fechaAltaPlataforma)}
        </p>
      </div>

      {/* Panel Mascotas (Owner) */}
      {usuario.role === "owner" && (
        <>
          <h2
            style={{
              fontFamily: "Madimi One, cursive",
              fontSize: 32,
              textAlign: "center",
              marginBottom: "2rem",
            }}
          >
            Mis mascotas
          </h2>
          {mascotas.length === 0 ? (
            <p style={{ textAlign: "center", fontSize: 18 }}>
              Todavía no tienes mascotas registradas.
            </p>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                gap: "2rem",
              }}
            >
              {mascotas.map((mascota) => (
                <div
                  key={mascota.idMascota}
                  style={{
                    border: "1px solid #ddd",
                    borderRadius: 12,
                    padding: "1rem",
                    background: "#fff",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                  }}
                >
                  <h3
                    style={{
                      fontSize: 22,
                      fontWeight: 600,
                      fontFamily: "Madimi One, cursive",
                      marginBottom: ".8rem",
                    }}
                  >
                    {mascota.nombreMascota}
                  </h3>

                  {mascota.tamanoMascota && (
                    <p>
                      <strong>Tamaño:</strong> {mascota.tamanoMascota}
                    </p>
                  )}

                  {mascota.cuidadosEspeciales && (
                    <p>
                      <strong>Cuidados especiales:</strong>{" "}
                      {mascota.cuidadosEspeciales}
                    </p>
                  )}

                  {(mascota.paseoManana || mascota.paseoMedioDia || mascota.paseoTarde) && (
                    <p>
                      <strong>Paseos:</strong>{" "}
                      {[mascota.paseoManana && "Mañana",
                        mascota.paseoMedioDia && "Mediodía",
                        mascota.paseoTarde && "Tarde"]
                        .filter(Boolean)
                        .join(", ")}
                    </p>
                  )}

                  {mascota.razaPerro && (
                    <p>
                      <strong>Raza perro:</strong> {mascota.razaPerro}
                    </p>
                  )}
                  {mascota.razaGato && (
                    <p>
                      <strong>Raza gato:</strong> {mascota.razaGato}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {/* Panel Servicios Ofrecidos (Pettier) */}
      {usuario.role === "pettier" && (
        <>
          <h2
            style={{
              fontFamily: "Madimi One, cursive",
              fontSize: 32,
              textAlign: "center",
              marginBottom: "2rem",
            }}
          >
            Mis servicios ofrecidos
          </h2>
          {serviciosOfrecidos.length === 0 ? (
            <p style={{ textAlign: "center", fontSize: 18 }}>
              Todavía no has publicado servicios.
            </p>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                gap: "2rem",
              }}
            >
              {serviciosOfrecidos.map((servicio) => (
                <div
                  key={servicio.idActividad}
                  style={{
                    border: "1px solid #ddd",
                    borderRadius: 12,
                    padding: "1rem",
                    background: "#fff",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                  }}
                >
                  <h3
                    style={{
                      fontSize: 22,
                      fontWeight: 600,
                      fontFamily: "Madimi One, cursive",
                      marginBottom: ".8rem",
                    }}
                  >
                    {servicio.tipoActividad}
                  </h3>

                  <p>
                    <strong>Fecha Inicio del Servicio:</strong> {formatearFecha(servicio.fechaInicio)}
                  </p>
                  <p>
                    <strong>Fecha Fin del Servicio:</strong> {formatearFecha(servicio.fechaFinal)}
                  </p>
                  <p>
                    <strong>Precio:</strong> {servicio.precio}€
                  </p>
                  <p>
                    <strong>Tamaño admitido:</strong> {servicio.animalesAdmitidos}
                  </p>
                  <button style={buttonStyle}>
                    Contratar Servicio
                  </button>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default DashboardCompleto;
