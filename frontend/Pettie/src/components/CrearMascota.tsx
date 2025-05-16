import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CrearMascota = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombreMascota: "",
    tamanoMascota: "",
    cuidadosEspeciales: "",
    paseoManana: false,
    paseoMedioDia: false,
    paseoTarde: false,
    razaPerro: "",
    razaGato: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLSelectElement>
  ): void => {
    const target = e.target;
    const name = target.name;

    if (target instanceof HTMLInputElement && target.type === "checkbox") {
      const checked = target.checked;
      setFormData((prev) => ({
        ...prev,
        [name]: checked,
      }));
    } else {
      const value = target.value;

      // Si escriben en razaPerro vaciamos razaGato y viceversa
      if (name === "razaPerro" && value.trim() !== "") {
        setFormData((prev) => ({
          ...prev,
          razaPerro: value,
          razaGato: "",
        }));
      } else if (name === "razaGato" && value.trim() !== "") {
        setFormData((prev) => ({
          ...prev,
          razaGato: value,
          razaPerro: "",
        }));
      } else {
        setFormData((prev) => ({
          ...prev,
          [name]: value,
        }));
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { nombreMascota, tamanoMascota, razaPerro, razaGato } = formData;

    if (!nombreMascota.trim()) {
      alert("El nombre de la mascota es obligatorio.");
      return;
    }
    if (!tamanoMascota.trim()) {
      alert("Debes seleccionar un tamaño para la mascota.");
      return;
    }
    if (!razaPerro.trim() && !razaGato.trim()) {
      alert("Debes indicar al menos una raza: perro o gato.");
      return;
    }

    const idOwner = sessionStorage.getItem("idUsuario");
    if (!idOwner) {
      alert("No has iniciado sesión.");
      navigate("/");
      return;
    }

    const dataToSend = {
      ...formData,
      idOwner: Number(idOwner),
      razaPerro: razaPerro || null,
      razaGato: razaGato || null,
    };

    try {
      const res = await fetch("http://localhost:4000/api/mascotas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSend),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Error al crear mascota");
      }

      const result = await res.json();
      alert("Mascota creada con ID: " + result.id);
      window.location.reload();
    } catch (err: unknown) {
      alert(err || "Error inesperado");
      console.error(err);
    }
  };

  return (
    <div
      style={{
        maxWidth: 600,
        margin: "60px auto",
        padding: "2rem",
        fontFamily: "'Inter', sans-serif",
        backgroundColor: "#f9f9f9",
        borderRadius: 20,
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
      }}
    >
      <h2
        style={{
          fontFamily: "'Madimi One', cursive",
          textAlign: "center",
          color: "#333",
          marginBottom: "1.5rem",
        }}
      >
        Crear Nueva Mascota
      </h2>
      <form onSubmit={handleSubmit}>
        <label style={{ display: "block", marginBottom: 12, fontWeight: "600" }}>
          Nombre de la Mascota:
          <input
            type="text"
            name="nombreMascota"
            value={formData.nombreMascota}
            onChange={handleChange}
            required
            placeholder="Ej: Firulais"
            style={{
              display: "block",
              width: "100%",
              padding: "8px 12px",
              marginTop: 6,
              borderRadius: 8,
              border: "1.5px solid #ccc",
              fontSize: "1rem",
              boxSizing: "border-box",
            }}
          />
        </label>

        <label style={{ display: "block", marginBottom: 12, fontWeight: "600" }}>
          Tamaño de la Mascota:
          <select
            name="tamanoMascota"
            value={formData.tamanoMascota}
            onChange={handleChange}
            required
            style={{
              display: "block",
              width: "100%",
              padding: "8px 12px",
              marginTop: 6,
              borderRadius: 8,
              border: "1.5px solid #ccc",
              fontSize: "1rem",
              boxSizing: "border-box",
              backgroundColor: "white",
              cursor: "pointer",
            }}
          >
            <option value="">-- Selecciona un tamaño --</option>
            <option value="Pequeño">Pequeño</option>
            <option value="Mediano">Mediano</option>
            <option value="Grande">Grande</option>
          </select>
        </label>

        <label style={{ display: "block", marginBottom: 12, fontWeight: "600" }}>
          Cuidados Especiales:
          <textarea
            name="cuidadosEspeciales"
            value={formData.cuidadosEspeciales}
            onChange={handleChange}
            placeholder="Ej: Medicación diaria, alergias..."
            rows={3}
            style={{
              display: "block",
              width: "100%",
              padding: "8px 12px",
              marginTop: 6,
              borderRadius: 8,
              border: "1.5px solid #ccc",
              fontSize: "1rem",
              boxSizing: "border-box",
              resize: "vertical",
            }}
          />
        </label>

        <fieldset
          style={{
            border: "1.5px solid #ddd",
            padding: "1rem",
            borderRadius: 12,
            marginBottom: 20,
          }}
        >
          <legend style={{ fontWeight: "700", fontSize: "1.1rem" }}>Paseos</legend>
          <label style={{ display: "block", marginBottom: 6, cursor: "pointer" }}>
            <input
              type="checkbox"
              name="paseoManana"
              checked={formData.paseoManana}
              onChange={handleChange}
              style={{ marginRight: 8 }}
            />
            Paseo Mañana
          </label>

          <label style={{ display: "block", marginBottom: 6, cursor: "pointer" }}>
            <input
              type="checkbox"
              name="paseoMedioDia"
              checked={formData.paseoMedioDia}
              onChange={handleChange}
              style={{ marginRight: 8 }}
            />
            Paseo Mediodía
          </label>

          <label style={{ display: "block", marginBottom: 6, cursor: "pointer" }}>
            <input
              type="checkbox"
              name="paseoTarde"
              checked={formData.paseoTarde}
              onChange={handleChange}
              style={{ marginRight: 8 }}
            />
            Paseo Tarde
          </label>
        </fieldset>

        {/* Solo muestra uno de los dos inputs de raza */}
        {formData.razaGato.trim() === "" && (
          <label style={{ display: "block", marginBottom: 12, fontWeight: "600" }}>
            Raza Perro:
            <input
              type="text"
              name="razaPerro"
              value={formData.razaPerro}
              onChange={handleChange}
              placeholder="Introduce la raza..."
              style={{
                display: "block",
                width: "100%",
                padding: "8px 12px",
                marginTop: 6,
                borderRadius: 8,
                border: "1.5px solid #ccc",
                fontSize: "1rem",
                boxSizing: "border-box",
              }}
            />
          </label>
        )}

        {formData.razaPerro.trim() === "" && (
          <label style={{ display: "block", marginBottom: 12, fontWeight: "600" }}>
            Raza Gato:
            <input
              type="text"
              name="razaGato"
              value={formData.razaGato}
              onChange={handleChange}
              placeholder="Introduce la raza..."
              style={{
                display: "block",
                width: "100%",
                padding: "8px 12px",
                marginTop: 6,
                borderRadius: 8,
                border: "1.5px solid #ccc",
                fontSize: "1rem",
                boxSizing: "border-box",
              }}
            />
          </label>
        )}

        <button
          type="submit"
          style={{
            marginTop: 20,
            padding: "0.75rem 1.5rem",
            fontSize: "1.1rem",
            borderRadius: 12,
            cursor: "pointer",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            width: "100%",
            fontWeight: "700",
            transition: "background-color 0.3s ease",
          }}
          onMouseEnter={(e) =>
            ((e.target as HTMLButtonElement).style.backgroundColor = "#0056b3")
          }
          onMouseLeave={(e) =>
            ((e.target as HTMLButtonElement).style.backgroundColor = "#007bff")
          }
        >
          Crear Mascota
        </button>
      </form>
    </div>
  );
};

export default CrearMascota;
