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
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>
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
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const idOwner = sessionStorage.getItem("idUsuario");
    if (!idOwner) {
      alert("No has iniciado sesión.");
      navigate("/");
      return;
    }

    // Prepara los datos para enviar
    const dataToSend = {
      ...formData,
      idOwner: Number(idOwner),
      // Para campos vacíos que pueden ser null:
      razaPerro: formData.razaPerro || null,
      razaGato: formData.razaGato || null,
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
      navigate("/misMascotas"); // Cambia esta ruta si quieres ir a otra página
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
        padding: "1rem",
        fontFamily: "Inter, sans-serif",
        backgroundColor: "#fff",
        borderRadius: 20,
      }}
    >
      <h2 style={{ fontFamily: "Madimi One, cursive", textAlign: "center" }}>
        Crear Nueva Mascota
      </h2>
      <form onSubmit={handleSubmit}>
        <label>
          Nombre de la Mascota:
          <input
            type="text"
            name="nombreMascota"
            value={formData.nombreMascota}
            onChange={handleChange}
            required
            placeholder="Ej: Firulais"
          />
        </label>
        <br />
        <label>
          Tamaño de la Mascota:
          <input
            type="text"
            name="tamanoMascota"
            value={formData.tamanoMascota}
            onChange={handleChange}
            required
            placeholder="Ej: Pequeño, Mediano, Grande"
          />
        </label>
        <br />
        <label>
          Cuidados Especiales:
          <textarea
            name="cuidadosEspeciales"
            value={formData.cuidadosEspeciales}
            onChange={handleChange}
            placeholder="Ej: Medicación diaria, alergias..."
            rows={3}
          />
        </label>
        <br />
        <fieldset style={{ border: "1px solid #ddd", padding: "0.5rem" }}>
          <legend>Paseos</legend>
          <label>
            <input
              type="checkbox"
              name="paseoManana"
              checked={formData.paseoManana}
              onChange={handleChange}
            />
            Paseo Mañana
          </label>
          <br />
          <label>
            <input
              type="checkbox"
              name="paseoMedioDia"
              checked={formData.paseoMedioDia}
              onChange={handleChange}
            />
            Paseo Mediodía
          </label>
          <br />
          <label>
            <input
              type="checkbox"
              name="paseoTarde"
              checked={formData.paseoTarde}
              onChange={handleChange}
            />
            Paseo Tarde
          </label>
        </fieldset>
        <br />
        <label>
          Raza Perro:
          <input
            type="text"
            name="razaPerro"
            value={formData.razaPerro}
            onChange={handleChange}
            placeholder="Opcional"
          />
        </label>
        <br />
        <label>
          Raza Gato:
          <input
            type="text"
            name="razaGato"
            value={formData.razaGato}
            onChange={handleChange}
            placeholder="Opcional"
          />
        </label>
        <br />
        <button
          type="submit"
          style={{
            marginTop: 12,
            padding: "0.5rem 1rem",
            fontSize: "1rem",
            borderRadius: 8,
            cursor: "pointer",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
          }}
        >
          Crear Mascota
        </button>
      </form>
    </div>
  );
};

export default CrearMascota;
