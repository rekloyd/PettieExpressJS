import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Mascota {
  idMascota: number;
  idOwner: number;
  nombreMascota: string;
  tamanoMascota: string;
  cuidadosEspeciales: string;
  paseoManana: boolean;
  paseoMedioDia: boolean;
  paseoTarde: boolean;
  razaPerro: string | null;
  razaGato: string | null;
}

const MascotaPorId = () => {
  const [mascotas, setMascotas] = useState<Mascota[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [formData, setFormData] = useState<Partial<Mascota>>({});
  const navigate = useNavigate();

  useEffect(() => {
    const idUsuario = sessionStorage.getItem("idUsuario");
    if (!idUsuario) {
      navigate("/");
      return;
    }

    (async () => {
      try {
        const res = await fetch(`http://localhost:4000/api/mascotas/owner/${idUsuario}`);
        if (!res.ok) throw new Error("No se pudieron obtener las mascotas");

        const data = await res.json();
        setMascotas(data);
      } catch (err) {
        setError("Error al cargar las mascotas");
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, [navigate]);

  const handleEditClick = (index: number) => {
    const mascota = mascotas[index];
    setEditIndex(index);
    setFormData({
      ...mascota,
      cuidadosEspeciales: mascota.cuidadosEspeciales || "",
      razaPerro: mascota.razaPerro || "",
      razaGato: mascota.razaGato || "",
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSaveClick = async (idMascota: number) => {
    try {
      if (editIndex === null) return;

      const res = await fetch(`http://localhost:4000/api/mascotas/${idMascota}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const text = await res.text();
      console.log("STATUS:", res.status);
      console.log("BODY:", text);

      if (!res.ok) throw new Error("Error al actualizar la mascota");

      setMascotas((prev) => {
        const updated = [...prev];
        updated[editIndex] = { ...updated[editIndex], ...formData };
        return updated;
      });

      setEditIndex(null);
    } catch (err) {
      console.error(err);
      alert("No se pudo actualizar la mascota");
    }
  };

  if (loading) {
    return (
      <h2
        style={{
          fontFamily: "Madimi One, cursive",
          marginTop: "200px",
          textAlign: "center",
        }}
      >
        Cargando mascotas...
      </h2>
    );
  }

  if (error) {
    return (
      <h2 style={{ color: "red", textAlign: "center" }}>{error}</h2>
    );
  }

  return (
    <div
      style={{
        fontFamily: "Inter, sans-serif",
        maxWidth: 800,
        margin: "80px auto",
        padding: "2rem",
        backgroundColor: "#fff",
        borderRadius: 20,
      }}
    >
      <h2
        style={{
          fontFamily: "Madimi One, cursive",
          fontSize: 32,
          marginBottom: "1.5rem",
          textAlign: "center",
        }}
      >
        Mis Mascotas
      </h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {mascotas.map((m, i) => (
          <li
            key={i}
            style={{
              padding: "1rem 0",
              borderBottom: i !== mascotas.length - 1 ? "1px solid #ddd" : "none",
            }}
          >
            {editIndex === i ? (
              <>
                <input
                  name="nombreMascota"
                  value={formData.nombreMascota || ""}
                  onChange={handleInputChange}
                  placeholder="Nombre"
                />
                <br />
                <input
                  name="tamanoMascota"
                  value={formData.tamanoMascota || ""}
                  onChange={handleInputChange}
                  placeholder="Tamaño"
                />
                <br />
                <input
                  name="cuidadosEspeciales"
                  value={formData.cuidadosEspeciales || ""}
                  onChange={handleInputChange}
                  placeholder="Cuidados especiales"
                />
                <br />
                <label>
                  <input
                    type="checkbox"
                    name="paseoManana"
                    checked={formData.paseoManana || false}
                    onChange={handleInputChange}
                  />{" "}
                  Paseo Mañana
                </label>
                <br />
                <label>
                  <input
                    type="checkbox"
                    name="paseoMedioDia"
                    checked={formData.paseoMedioDia || false}
                    onChange={handleInputChange}
                  />{" "}
                  Paseo Mediodía
                </label>
                <br />
                <label>
                  <input
                    type="checkbox"
                    name="paseoTarde"
                    checked={formData.paseoTarde || false}
                    onChange={handleInputChange}
                  />{" "}
                  Paseo Tarde
                </label>
                <br />
                <input
                  name="razaPerro"
                  value={formData.razaPerro || ""}
                  onChange={handleInputChange}
                  placeholder="Raza Perro"
                />
                <br />
                <input
                  name="razaGato"
                  value={formData.razaGato || ""}
                  onChange={handleInputChange}
                  placeholder="Raza Gato"
                />
                <br />
                <button onClick={() => handleSaveClick(m.idMascota)}>
                  Guardar
                </button>
                <button onClick={() => setEditIndex(null)}>Cancelar</button>
              </>
            ) : (
              <>
                <p>
                  <strong>Nombre:</strong> {m.nombreMascota}
                </p>
                <p>
                  <strong>Tamaño:</strong> {m.tamanoMascota}
                </p>
                <p>
                  <strong>Cuidados especiales:</strong> {m.cuidadosEspeciales}
                </p>
                <p>
                  <strong>Paseos:</strong>
                  <ul>
                    <li>Mañana: {m.paseoManana ? "Sí" : "No"}</li>
                    <li>Mediodía: {m.paseoMedioDia ? "Sí" : "No"}</li>
                    <li>Tarde: {m.paseoTarde ? "Sí" : "No"}</li>
                  </ul>
                </p>
                {m.razaPerro ? (
                  <p>
                    <strong>Raza (Perro):</strong> {m.razaPerro}
                  </p>
                ) : null}
                {m.razaGato ? (
                  <p>
                    <strong>Raza (Gato):</strong> {m.razaGato}
                  </p>
                ) : null}
                <button onClick={() => handleEditClick(i)}>Editar</button>
              </>
            )}
          </li>
        ))}
      </ul>
      <div style={{ textAlign: "center", marginTop: "2rem" }}>
        <button
          style={{
            padding: "0.5rem 1rem",
            fontSize: "1rem",
            borderRadius: 8,
            cursor: "pointer",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
          }}
          onClick={() => navigate("/anadirMascota")}
        >
          Añadir Mascota
        </button>
      </div>
    </div>
  );
};

export default MascotaPorId;
