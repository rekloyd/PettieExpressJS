import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

type Rol = "admin" | "owner" | "pettier";

interface Usuario {
  nombreUsuario: string;
  role: Rol;
  fechaAltaPlataforma: string;
}

interface Mascota {
  idMascota: number;
  idOwner: number;
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
  idPettier: number;
  tipoActividad: string;
  fechaInicio: string;
  fechaFinal: string;
  precio: number;
  animalesAdmitidos: "pequeno" | "mediano" | "grande";
}
interface Servicio {
  idActividad: number;
  idOwner:number;
  idPettier: number;
  idMascota:number;
  tipoActividad: string;
  fechaInicio: string;
  fechaFinal: string;
  precio: number;
  animalesAdmitidos: "pequeno" | "mediano" | "grande";
}

const buttonStyle = {
  border: "1px solid black",
  width: "150px",
  height: "35px",
  borderRadius: "5px",
  backgroundColor: "rgb(247, 169, 82)",
  marginBottom: "4px",
};

const DashboardCompleto = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [mascotas, setMascotas] = useState<Mascota[]>([]);
  const [mascotaSeleccionada, setMascotaSeleccionada] = useState<string>(""); // ID de la mascota seleccionada en el select del modal
  const [serviciosOfrecidos, setServiciosOfrecidos] = useState<
    ServicioOfrecido[]
  >([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [servicioSeleccionado, setServicioSeleccionado] =
    useState<ServicioOfrecido | null>(null);

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

  /**
   * Lógica del modal
   */


  const idLocalStorage = sessionStorage.getItem("idUsuario");

  const datosMascotaOwner = async (idOwner: string): Promise<Mascota[]> => {
    const url = `http://localhost:4000/api/mascotas/owner/${idOwner}`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        console.error("Error al obtener los datos");
        return [];
      }

      const datosMascotas: Mascota[] = await response.json();
      return datosMascotas;
    } catch (error) {
      console.error("Error al obtener los servicios:", error);
      return [];
    }
  };

  const abrirModal = async (
    servicio: ServicioOfrecido,
    idLocalStorage: string
  ) => {
    console.log("El id del owner en sessionStorage es:" + idLocalStorage);
    const url = `http://localhost:4000/api/usuario/${idLocalStorage}`;
    console.log("URL de la petición:", url); // Agregado para hacer log de la URL
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Error en la petición");

      const data: Usuario = await response.json();
      if (data.role == "owner") {
        const mascotas: Mascota[] = await datosMascotaOwner(idLocalStorage);
        setMascotas(mascotas);
        console.log(mascotas);
        setServicioSeleccionado(servicio);
        setMostrarModal(true);
      } else {
        console.log(data);
        alert("no es owner");
      }
    } catch (error) {
      console.error("Error al obtener los servicios:", error);
    }
  };

  const cerrarModal = () => {
    setMostrarModal(false);
    setServicioSeleccionado(null);
  };

  //conversor de fecha

  function formatearFechaToSQL(dateInput: string | Date): string {
    const date = new Date(dateInput);
    const pad = (n: number) => n.toString().padStart(2, "0");

    return (
      `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
        date.getDate()
      )} ` +
      `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(
        date.getSeconds()
      )}`
    );
  }

  const contratarServicio = async (servicio: ServicioOfrecido,idMascota: string,idOwner: string) => {

    //Que al tener exito la reserva reste los pettieCoins

    const url = 'http://localhost:4000/api/servicio/';

    const fechaInicio = formatearFechaToSQL(servicio.fechaInicio);
    const fechaFinal = formatearFechaToSQL(servicio.fechaFinal);

    console.log("Inicio:", fechaInicio);
    console.log("Final:", fechaFinal);
    console.log("idOwner:" + idOwner);
    console.log("idMascota:" + idMascota);
    try {
      const body = {
        idOwner:idOwner,
        idPettier:servicio.idPettier,
        idMascota:idMascota,
        tipoActividad: servicio.tipoActividad,
        fechaInicio:fechaInicio,
        fechaFinal:fechaFinal,
        precio:servicio.precio,
        finalizado:0
      };

      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      if (!response.ok) throw new Error("Error al contratar el servicio");

      alert("Servicio contratado con éxito");

      //restarPettieCoins();

    } catch (error) {
      console.error("Error en contratarServicio:", error);
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

        // Convertir role a minúsculas y asegurar que sea de tipo Rol
        const roleRaw = (userData.role ?? "pettier").toLowerCase();
        const role = ["admin", "owner", "pettier"].includes(roleRaw)
          ? (roleRaw as Rol)
          : "pettier";

        setUsuario({
          nombreUsuario: userData.nombreUsuario,
          role,
          fechaAltaPlataforma:
            userData.fechaAltaPlataforma ?? new Date().toISOString(),
        });

        if (role === "owner") {
          const mascotasRes = await fetch(
            `http://localhost:4000/api/mascotas/owner/${id}`
          );
          if (!mascotasRes.ok) throw new Error();
          const mascotasData = await mascotasRes.json();
          setMascotas(mascotasData);
        }

        if (role === "pettier") {
          const serviciosRes = await fetch(
            `http://localhost:4000/api/serviciosOfrecidos?idPettier=${id}`
          );
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

                  {(mascota.paseoManana ||
                    mascota.paseoMedioDia ||
                    mascota.paseoTarde) && (
                    <p>
                      <strong>Paseos:</strong>{" "}
                      {[
                        mascota.paseoManana && "Mañana",
                        mascota.paseoMedioDia && "Mediodía",
                        mascota.paseoTarde && "Tarde",
                      ]
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
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    <h3
                      style={{
                        fontSize: 22,
                        fontWeight: 600,
                        fontFamily: "Madimi One, cursive",
                        marginBottom: ".5rem",
                      }}
                    >
                      {servicio.tipoActividad}
                    </h3>
                    <p>
                      <strong>Fecha inicio:</strong>{" "}
                      {formatearFecha(servicio.fechaInicio)}
                    </p>
                    <p>
                      <strong>Fecha fin:</strong>{" "}
                      {formatearFecha(servicio.fechaFinal)}
                    </p>
                    <p>
                      <strong>Precio:</strong> {servicio.precio} 🪙
                    </p>
                    <p>
                      <strong>Animales admitidos:</strong>{" "}
                      {servicio.animalesAdmitidos}
                    </p>
                  </div>
                  <button
                    onClick={() => abrirModal(servicio, idLocalStorage!)}
                    style={buttonStyle}
                    type="button"
                  >
                    Contratar
                  </button>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {/* Modal de confirmación */}
      {mostrarModal && servicioSeleccionado && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "2rem",
              borderRadius: "12px",
              maxWidth: "400px",
              width: "100%",
              textAlign: "center",
            }}
          >
            <form
              onSubmit={(e) => {
                e.preventDefault(); // Evita que recargue la página
                contratarServicio(servicioSeleccionado, mascotaSeleccionada, idLocalStorage!);
                cerrarModal();
              }}
            >
              <h3>Confirmar contratación</h3>
              <p>
                ¿Quieres contratar el servicio de{" "}
                <strong>{servicioSeleccionado.tipoActividad}</strong>?
              </p>

              <h6 style={{ textAlign: "center" }}>Añade a tu mascota</h6>
              <div style={{ marginTop: "1rem" }}>
                <select
                  id="mascotaSelect"
                  value={mascotaSeleccionada}
                  onChange={(e) => setMascotaSeleccionada(e.target.value)}
                  required
                  style={{
                    width: "100%",
                    marginTop: "0.5rem",
                    padding: "0.5rem",
                  }}
                >
                  <option value="">-- Selecciona una mascota --</option>
                  {mascotas.map((m) => (
                    <option key={m.idMascota} value={m.idMascota}>
                      {m.nombreMascota}
                    </option>
                  ))}
                </select>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "1rem",
                  marginTop: "1.5rem",
                }}
              >
                <button
                  type="button"
                  onClick={cerrarModal}
                  style={{ ...buttonStyle, backgroundColor: "lightgray" }}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  style={{
                    ...buttonStyle,
                    backgroundColor: "rgb(102, 196, 204)",
                  }}
                >
                  Confirmar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardCompleto;
