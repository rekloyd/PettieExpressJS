import { useState } from "react";
import { useNavigate } from "react-router-dom";

/**
 * Interface que define la forma de los datos del formulario para crear una mascota.
 */
interface FormData {
  nombreMascota: string;
  tamanoMascota: string;
  cuidadosEspeciales: string;
  paseoManana: boolean;
  paseoMedioDia: boolean;
  paseoTarde: boolean;
  razaPerro: string;
  razaGato: string;
}

/**
 * Componente React para crear una nueva mascota.
 *
 * Gestiona un formulario con campos para nombre, tamaño, cuidados especiales,
 * horarios de paseo, y raza (perro o gato).
 * Valida los datos antes de enviarlos a un endpoint para crear la mascota.
 *
 * @component
 *
 * @author Pau
 * @author Didac Morillas
 * @version 0.5.1
 * @date 2025-05-19
 */
const CrearMascota = () => {
  const navigate = useNavigate();

  /**
   * Estado que guarda los datos del formulario.
   */
  const [formData, setFormData] = useState<FormData>({
    nombreMascota: "",
    tamanoMascota: "",
    cuidadosEspeciales: "",
    paseoManana: false,
    paseoMedioDia: false,
    paseoTarde: false,
    razaPerro: "",
    razaGato: "",
  });

  /**
   * Maneja el cambio en los inputs del formulario.
   * Detecta si es checkbox para manejar valores booleanos,
   * y gestiona la exclusividad entre razaPerro y razaGato.
   *
   * @param e - Evento de cambio en input, textarea o select
   */
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
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

  /**
   * Maneja el envío del formulario.
   * Valida los datos, obtiene el id del usuario desde sessionStorage,
   * y envía la petición POST para crear la mascota.
   *
   * @param e - Evento submit del formulario
   */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
      alert(err instanceof Error ? err.message : "Error inesperado");
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
        <label
          style={{ display: "block", marginBottom: 12, fontWeight: "600" }}
        >
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

        <label
          style={{ display: "block", marginBottom: 12, fontWeight: "600" }}
        >
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

        <label
          style={{ display: "block", marginBottom: 12, fontWeight: "600" }}
        >
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
          <legend style={{ fontWeight: "700", fontSize: "1.1rem" }}>
            Paseos
          </legend>
          <label
            style={{ display: "block", marginBottom: 6, cursor: "pointer" }}
          >
            <input
              type="checkbox"
              name="paseoManana"
              checked={formData.paseoManana}
              onChange={handleChange}
              style={{ marginRight: 8 }}
            />
            Paseo Mañana
          </label>

          <label
            style={{ display: "block", marginBottom: 6, cursor: "pointer" }}
          >
            <input
              type="checkbox"
              name="paseoMedioDia"
              checked={formData.paseoMedioDia}
              onChange={handleChange}
              style={{ marginRight: 8 }}
            />
            Paseo Mediodía
          </label>

          <label
            style={{ display: "block", marginBottom: 6, cursor: "pointer" }}
          >
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

        {formData.razaGato.trim() === "" && (
          <label
            style={{ display: "block", marginBottom: 12, fontWeight: "600" }}
          >
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
          <label
            style={{ display: "block", marginBottom: 12, fontWeight: "600" }}
          >
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
            backgroundColor: "#007bff",
            color: "white",
            fontWeight: "600",
            padding: "10px 20px",
            border: "none",
            borderRadius: 8,
            cursor: "pointer",
            width: "100%",
            fontSize: "1.1rem",
          }}
        >
          Crear Mascota
        </button>
      </form>
    </div>
  );
};

export default CrearMascota;
