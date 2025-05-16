import { useEffect, useState } from "react";

interface Servicio {
  id: number;
  nombreServicio: string;
  descripcion: string;
  precio: number;
}

const ServiciosOfrecidosComponent = () => {
  const [servicios, setServicios] = useState<Servicio[]>([]);
  const [nuevoServicio, setNuevoServicio] = useState<Servicio>({
    id: 0,
    nombreServicio: "",
    descripcion: "",
    precio: 0,
  });
  const [editando, setEditando] = useState(false);
  const [servicioAEditar, setServicioAEditar] = useState<Servicio | null>(null);
  const [loading, setLoading] = useState(false);

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNuevoServicio((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCreate = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:4000/api/serviciosOfrecidos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(nuevoServicio),
      });
      if (!res.ok) throw new Error("Error al crear el servicio");
      fetchServicios();
      setNuevoServicio({ id: 0, nombreServicio: "", descripcion: "", precio: 0 });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (servicio: Servicio) => {
    setEditando(true);
    setServicioAEditar(servicio);
    setNuevoServicio(servicio);
  };

  const handleUpdate = async () => {
    try {
      setLoading(true);
      const res = await fetch(`http://localhost:4000/api/serviciosOfrecidos/${nuevoServicio.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(nuevoServicio),
      });
      if (!res.ok) throw new Error("Error al actualizar el servicio");
      fetchServicios();
      setNuevoServicio({ id: 0, nombreServicio: "", descripcion: "", precio: 0 });
      setEditando(false);
      setServicioAEditar(null);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      setLoading(true);
      const res = await fetch(`http://localhost:4000/api/serviciosOfrecidos/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Error al eliminar el servicio");
      fetchServicios();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServicios();
  }, []);

  return (
    <div style={{ marginTop: "20px", fontFamily: "Inter, sans-serif" }}>
      <h3 style={{ textAlign: "center", fontSize: "24px" }}>
        Servicios Ofrecidos
      </h3>

      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          name="nombreServicio"
          placeholder="Nombre del Servicio"
          value={nuevoServicio.nombreServicio}
          onChange={handleChange}
          disabled={loading}
          style={{ padding: "0.5rem", width: "100%", marginBottom: "10px" }}
        />
        <textarea
          name="descripcion"
          placeholder="Descripción"
          value={nuevoServicio.descripcion}
          onChange={handleChange}
          disabled={loading}
          style={{ padding: "0.5rem", width: "100%", marginBottom: "10px", height: "80px" }}
        />
        <input
          type="number"
          name="precio"
          placeholder="Precio"
          value={nuevoServicio.precio}
          onChange={handleChange}
          disabled={loading}
          style={{ padding: "0.5rem", width: "100%", marginBottom: "10px" }}
        />
        <button
          onClick={editando ? handleUpdate : handleCreate}
          disabled={loading}
          style={{ padding: "0.7rem", width: "100%", backgroundColor: "#4CAF50", color: "white", border: "none", borderRadius: "5px" }}
        >
          {loading ? "Guardando..." : editando ? "Actualizar Servicio" : "Crear Servicio"}
        </button>
      </div>

      <div style={{ marginTop: "20px" }}>
        {servicios.length === 0 ? (
          <p style={{ textAlign: "center" }}>No hay servicios registrados.</p>
        ) : (
          <ul style={{ listStyleType: "none", padding: 0 }}>
            {servicios.map((servicio) => (
              <li
                key={servicio.id}
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
                  <strong>{servicio.nombreServicio}</strong>
                  <p>{servicio.descripcion}</p>
                  <p>Precio: {servicio.precio} 🪙</p>
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
                    onClick={() => handleDelete(servicio.id)}
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
