/**
 * Componente ServicioOfrecidos que muestra todos los servicios filtrados por params a partir de un fetch.
 *
 * @author Pau
 * @author Didac Morillas
 * @version 0.5.1
 * @date 2025-05-19
 */

import { useEffect, useState } from "react";

interface Servicio {
  idActividad: number;
  tipoActividad: string;
  precio: number;
  fechaInicio: string;
  fechaFinal: string;
  animalesAdmitidos: string;
}

const ServiciosOfrecidosComponent = () => {
  const [servicios, setServicios] = useState<Servicio[]>([]);
  const [nuevoServicio, setNuevoServicio] = useState<Servicio>({
    idActividad: 0,
    tipoActividad: "",
    precio: 0,
    fechaInicio: "",
    fechaFinal: "",
    animalesAdmitidos: "",
  });
  const [editando, setEditando] = useState(false);
  const [loading, setLoading] = useState(false);

  // Función para formatear las fechas al formato 'YYYY-MM-DD HH:mm:ss'
  const formatDate = (date: string) => {
    const dateObj = new Date(date);
    const year = dateObj.getFullYear();
    const month = (dateObj.getMonth() + 1).toString().padStart(2, "0");
    const day = dateObj.getDate().toString().padStart(2, "0");
    const hours = dateObj.getHours().toString().padStart(2, "0");
    const minutes = dateObj.getMinutes().toString().padStart(2, "0");
    const seconds = dateObj.getSeconds().toString().padStart(2, "0");

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  // Función corregida para extraer solo la parte de la fecha en formato 'YYYY-MM-DD' para input date
  const formatDateForInput = (date: string) => {
    const dateObj = new Date(date);

    if (isNaN(dateObj.getTime())) {
      return "";
    }

    const year = dateObj.getFullYear();
    const month = (dateObj.getMonth() + 1).toString().padStart(2, "0");
    const day = dateObj.getDate().toString().padStart(2, "0");

    return `${year}-${month}-${day}`;
  };


  // Función para mostrar fecha en formato día/mes/año para texto
const formatDateForDisplay = (date: string) => {
  const dateObj = new Date(date);

  if (isNaN(dateObj.getTime())) {
    return "";
  }

  const day = dateObj.getDate().toString().padStart(2, "0");
  const month = (dateObj.getMonth() + 1).toString().padStart(2, "0");
  const year = dateObj.getFullYear();

  return `${day}/${month}/${year}`;
};


  const fetchServicios = async () => {
    try {
      const res = await fetch("http://localhost:4000/api/serviciosOfrecidos");
      if (!res.ok) throw new Error("Error al cargar los servicios");
      const data = await res.json();
      setServicios(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNuevoServicio((prev) => ({
      ...prev,
      [name]: name === "precio" ? Number(value) : value,
    }));
  };

  const handleCreate = async () => {
    const idPettier = sessionStorage.getItem("idUsuario");

    if (!idPettier) {
      alert("No se encontró ID de usuario (Pettier). Inicia sesión nuevamente.");
      return;
    }

    try {
      setLoading(true);

      const formattedFechaInicio = formatDate(nuevoServicio.fechaInicio);
      const formattedFechaFinal = formatDate(nuevoServicio.fechaFinal);

      const res = await fetch("http://localhost:4000/api/servicioOfrecido", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...nuevoServicio,
          fechaInicio: formattedFechaInicio,
          fechaFinal: formattedFechaFinal,
          idPettier: Number(idPettier),
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Error al crear el servicio");
      }
      fetchServicios();
      resetForm();
    } catch (error) {
      console.error(error);
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (servicio: Servicio) => {
    setEditando(true);
    setNuevoServicio(servicio);
  };

  const handleUpdate = async () => {
    try {
      setLoading(true);

      const formattedFechaInicio = formatDate(nuevoServicio.fechaInicio);
      const formattedFechaFinal = formatDate(nuevoServicio.fechaFinal);

      const res = await fetch(
        `http://localhost:4000/api/servicioOfrecido/${nuevoServicio.idActividad}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...nuevoServicio,
            fechaInicio: formattedFechaInicio,
            fechaFinal: formattedFechaFinal,
          }),
        }
      );

      if (!res.ok) throw new Error("Error al actualizar el servicio");
      fetchServicios();
      resetForm();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      setLoading(true);
      const res = await fetch(
        `http://localhost:4000/api/servicioOfrecido/${id}`,
        {
          method: "DELETE",
        }
      );
      if (!res.ok) throw new Error("Error al eliminar el servicio");
      fetchServicios();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setNuevoServicio({
      idActividad: 0,
      tipoActividad: "",
      precio: 0,
      fechaInicio: "",
      fechaFinal: "",
      animalesAdmitidos: "",
    });
    setEditando(false);
  };

  useEffect(() => {
    fetchServicios();
  }, []);

  return (
    <div style={{ marginTop: "20px", fontFamily: "Inter, sans-serif" }}>
      <h3 style={{ textAlign: "center", fontSize: "24px" }}>Servicios Ofrecidos</h3>

      <div style={{ marginBottom: "20px" }}>
        <label>Tipo de Actividad</label>
        <input
          type="text"
          name="tipoActividad"
          value={nuevoServicio.tipoActividad}
          onChange={handleChange}
          disabled={loading}
          style={{ padding: "0.5rem", width: "100%", marginBottom: "10px" }}
        />

        <label>Precio</label>
        <input
          type="number"
          name="precio"
          value={nuevoServicio.precio}
          onChange={handleChange}
          disabled={loading}
          style={{ padding: "0.5rem", width: "100%", marginBottom: "10px" }}
        />

        <label>Fecha de Inicio</label>
        <input
          type="date"
          name="fechaInicio"
          value={formatDateForInput(nuevoServicio.fechaInicio)}
          onChange={handleChange}
          disabled={loading}
          style={{ padding: "0.5rem", width: "100%", marginBottom: "10px" }}
        />

        <label>Fecha Final</label>
        <input
          type="date"
          name="fechaFinal"
          value={formatDateForInput(nuevoServicio.fechaFinal)}
          onChange={handleChange}
          disabled={loading}
          style={{ padding: "0.5rem", width: "100%", marginBottom: "10px" }}
        />
        <label>Animales Admitidos</label>
        <select
          name="animalesAdmitidos"
          value={nuevoServicio.animalesAdmitidos}
          onChange={handleChange}
          disabled={loading}
          style={{ padding: "0.5rem", width: "100%", marginBottom: "10px" }}
        >
          <option value="">Selecciona un tamaño</option>
          <option value="pequeno">Pequeño</option>
          <option value="mediano">Mediano</option>
          <option value="grande">Grande</option>
        </select>

        <button
          onClick={editando ? handleUpdate : handleCreate}
          disabled={loading}
          style={{
            padding: "0.7rem",
            width: "100%",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "5px",
          }}
        >
          {loading
            ? "Guardando..."
            : editando
            ? "Actualizar Servicio"
            : "Crear Servicio"}
        </button>
      </div>

      <div style={{ marginTop: "20px" }}>
        {servicios.length === 0 ? (
          <p style={{ textAlign: "center" }}>No hay servicios registrados.</p>
        ) : (
          <ul style={{ listStyleType: "none", padding: 0 }}>
            {servicios.map((servicio) => (
              <li
                key={servicio.idActividad}
                style={{
                  padding: "10px",
                  border: "1px solid #ddd",
                  borderRadius: "5px",
                  marginBottom: "10px",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <strong>{servicio.tipoActividad}</strong>
                  <p>id: {servicio.idActividad}</p>
                  <p>Precio: {servicio.precio} 🪙</p>
                  <p>Fecha Inicio: {formatDateForDisplay(servicio.fechaInicio)}</p>
                  <p>Fecha Final: {formatDateForDisplay(servicio.fechaFinal)}</p>
                  <p>Animales admitidos: {servicio.animalesAdmitidos}</p>
                </div>
                <div>
                  <button
                    onClick={() => handleEdit(servicio)}
                    style={{
                      padding: "0.5rem",
                      margin: "5px",
                      backgroundColor: "#ff9800",
                      color: "white",
                      border: "none",
                      borderRadius: "5px",
                    }}
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(servicio.idActividad)}
                    style={{
                      padding: "0.5rem",
                      margin: "5px",
                      backgroundColor: "#f44336",
                      color: "white",
                      border: "none",
                      borderRadius: "5px",
                    }}
                  >
                    Eliminar
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ServiciosOfrecidosComponent;
