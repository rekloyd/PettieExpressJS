import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Mascota {
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

  if (loading) {
    return <h2 style={{ fontFamily: "Madimi One, cursive", marginTop: "200px", textAlign: "center" }}>Cargando mascotas...</h2>;
  }

  if (error) {
    return <h2 style={{ color: "red", textAlign: "center" }}>{error}</h2>;
  }

  if (mascotas.length === 0) {
    return <h2 style={{ textAlign: "center" }}>No tienes mascotas registradas.</h2>;
  }

  return (
    <div style={{ fontFamily: "Inter, sans-serif", maxWidth: 800, margin: "80px auto", padding: "2rem", backgroundColor: "#fff", borderRadius: 20, boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
      <h2 style={{ fontFamily: "Madimi One, cursive", fontSize: 32, marginBottom: "1.5rem", textAlign: "center" }}>
        Mis Mascotas
      </h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {mascotas.map((m, i) => (
          <li key={i} style={{ borderBottom: "1px solid #ddd", padding: "1rem 0" }}>
            <strong>Nombre:</strong> {m.nombreMascota}<br />
            <strong>Tamaño:</strong> {m.tamanoMascota}<br />
            <strong>Cuidados especiales:</strong> {m.cuidadosEspeciales}<br />
            <strong>Paseos:</strong>
            <ul>
              <li>Mañana: {m.paseoManana ? "Sí" : "No"}</li>
              <li>Mediodía: {m.paseoMedioDia ? "Sí" : "No"}</li>
              <li>Tarde: {m.paseoTarde ? "Sí" : "No"}</li>
            </ul>
            <strong>Raza (Perro):</strong> {m.razaPerro}<br />
            <strong>Raza (Gato):</strong> {m.razaGato}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MascotaPorId;
