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
  razaPerro: string;
  razaGato: string;
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
      <h2 style={{ 
        fontFamily: "Madimi One, cursive", 
        marginTop: "200px", 
        textAlign: "center", 
        color: "#6c757d" 
      }}>
        Cargando mascotas...
      </h2>
    );
  }

  if (error) {
    return (
      <h2 style={{ 
        color: "#dc3545", 
        textAlign: "center", 
        fontWeight: "bold",
        marginTop: "200px"
      }}>
        {error}
      </h2>
    );
  }

  return (
    <div style={{
      fontFamily: "Inter, sans-serif",
      maxWidth: 800,
      margin: "80px auto",
      padding: "2.5rem 3rem",
      backgroundColor: "#fefefe",
      borderRadius: 20
    }}>
      <h2 style={{
        fontFamily: "Madimi One, cursive",
        fontSize: 36,
        marginBottom: "2rem",
        textAlign: "center",
        color: "#343a40",
        textShadow: "1px 1px 2px rgba(0,0,0,0.1)"
      }}>
        Mis Mascotas
      </h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {mascotas.map((m, i) => (
          <li key={i} style={{
            borderBottom: i !== mascotas.length - 1 ? "1px solid #ddd" : "none",
            padding: "1.5rem 0",
            transition: "background-color 0.3s ease",
            borderRadius: editIndex === i ? 12 : 0,
            backgroundColor: editIndex === i ? "#f0f8ff" : "transparent"
          }}>
            {editIndex === i ? (
              <>
                <input
                  name="nombreMascota"
                  value={formData.nombreMascota || ""}
                  onChange={handleInputChange}
                  placeholder="Nombre"
                  style={inputStyle}
                  autoFocus
                />
                <input
                  name="tamanoMascota"
                  value={formData.tamanoMascota || ""}
                  onChange={handleInputChange}
                  placeholder="Tamaño"
                  style={inputStyle}
                />
                <input
                  name="cuidadosEspeciales"
                  value={formData.cuidadosEspeciales || ""}
                  onChange={handleInputChange}
                  placeholder="Cuidados especiales"
                  style={inputStyle}
                />
                <div style={{ marginBottom: 12 }}>
                  <label style={checkboxLabelStyle}>
                    <input
                      type="checkbox"
                      name="paseoManana"
                      checked={formData.paseoManana || false}
                      onChange={handleInputChange}
                      style={{ marginRight: 8 }}
                    />
                    Paseo Mañana
                  </label>
                  <label style={checkboxLabelStyle}>
                    <input
                      type="checkbox"
                      name="paseoMedioDia"
                      checked={formData.paseoMedioDia || false}
                      onChange={handleInputChange}
                      style={{ marginRight: 8 }}
                    />
                    Paseo Mediodía
                  </label>
                  <label style={checkboxLabelStyle}>
                    <input
                      type="checkbox"
                      name="paseoTarde"
                      checked={formData.paseoTarde || false}
                      onChange={handleInputChange}
                      style={{ marginRight: 8 }}
                    />
                    Paseo Tarde
                  </label>
                </div>
                <input
                  name="razaPerro"
                  value={formData.razaPerro || ""}
                  onChange={handleInputChange}
                  placeholder="Raza Perro"
                  style={inputStyle}
                />
                <input
                  name="razaGato"
                  value={formData.razaGato || ""}
                  onChange={handleInputChange}
                  placeholder="Raza Gato"
                  style={inputStyle}
                />
                <div style={{ marginTop: 16 }}>
                  <button
                    onClick={() => handleSaveClick(m.idMascota)}
                    style={{ ...buttonStyle, backgroundColor: "#28a745", marginRight: 12 }}
                  >
                    Guardar
                  </button>
                  <button
                    onClick={() => setEditIndex(null)}
                    style={{ ...buttonStyle, backgroundColor: "#dc3545" }}
                  >
                    Cancelar
                  </button>
                </div>
              </>
            ) : (
              <>
                <p><strong>Nombre:</strong> {m.nombreMascota}</p>
                <p><strong>Tamaño:</strong> {m.tamanoMascota}</p>
                <p><strong>Cuidados especiales:</strong> {m.cuidadosEspeciales || <em style={{color:"#6c757d"}}>Ninguno</em>}</p>
                <p><strong>Paseos:</strong></p>
                <ul style={{ paddingLeft: "1.2rem", marginTop: 0, marginBottom: 10 }}>
                  <li>Mañana: <span style={{ color: m.paseoManana ? "#198754" : "#dc3545" }}>{m.paseoManana ? "Sí" : "No"}</span></li>
                  <li>Mediodía: <span style={{ color: m.paseoMedioDia ? "#198754" : "#dc3545" }}>{m.paseoMedioDia ? "Sí" : "No"}</span></li>
                  <li>Tarde: <span style={{ color: m.paseoTarde ? "#198754" : "#dc3545" }}>{m.paseoTarde ? "Sí" : "No"}</span></li>
                </ul>
                <p><strong>Raza (Perro):</strong> {m.razaPerro || <em style={{color:"#6c757d"}}>No especificada</em>}</p>
                <p><strong>Raza (Gato):</strong> {m.razaGato || <em style={{color:"#6c757d"}}>No especificada</em>}</p>
                <button
                  onClick={() => handleEditClick(i)}
                  style={{ ...buttonStyle, backgroundColor: "#0d6efd", marginTop: 8 }}
                >
                  Editar
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "10px 14px",
  marginBottom: 14,
  fontSize: 16,
  borderRadius: 8,
  border: "1.5px solid #ccc",
  outlineColor: "#0d6efd",
  transition: "border-color 0.3s ease",
};

const checkboxLabelStyle: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  marginRight: 20,
  fontSize: 15,
  color: "#495057",
  cursor: "pointer",
  userSelect: "none"
};

const buttonStyle: React.CSSProperties = {
  color: "#fff",
  fontWeight: "600",
  padding: "10px 18px",
  fontSize: 16,
  borderRadius: 8,
  border: "none",
  cursor: "pointer",
  transition: "background-color 0.3s ease",
};

export default MascotaPorId;
