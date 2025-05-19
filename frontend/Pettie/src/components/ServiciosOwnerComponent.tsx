import React, { useEffect, useState } from "react";

interface Servicio {
  idActividad: number;
  idOwner:number;
  idPettier: number;
  idMascota:number;
  tipoActividad: string;
  fechaInicio: string;
  fechaFinal: string;
  precio: number;
  finalizado:number;

}

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

const formatearFecha = (fechaISO: string) =>
  new Date(fechaISO).toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

const cardStyle = {
  border: "1px solid #ddd",
  borderRadius: 12,
  padding: "1rem",
  background: "#fff",
  boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
  marginBottom: "1rem",
};


const finalizarServicio = async (id:string)=>{
  const url = `http://localhost:4000/api/servicios/${id}`;
  
  

}

const sessionStorageId = sessionStorage.getItem('idUsuario');

const ServiciosLista = () => {
  const [servicios, setServicios] = useState<Servicio[]>([]);
  const [mascotas, setMascotas] = useState<Mascota[]>([]);

  useEffect(() => {
    async function fetchServicios() {
      try {
        const res = await fetch(`http://localhost:4000/api/servicios/filtered/?idOwner=${sessionStorageId}`);
        if (!res.ok) throw new Error("Error al cargar servicios");
        const data = await res.json();
        setServicios(data);
        
        const resMascotas = await fetch(`http://localhost:4000/api/mascotas/owner/${sessionStorageId}`);
        if(!resMascotas.ok){
          console.log("error al intentar obtener la mascota");
        }
        const dataMascota = await resMascotas.json();
        setMascotas(dataMascota);


      } catch (error) {
        console.error(error);
      }
    }
    fetchServicios();
  }, []);

  if (servicios.length === 0) {
    return <p style={{ textAlign: "center" }}>No hay servicios disponibles.</p>;
  }


  return (
    <div
      style={{
        maxWidth: 800,
        margin: "2rem auto",
        fontFamily: "Inter, sans-serif",
      }}
    >
      <h2
        style={{
          fontFamily: "Madimi One, cursive",
          fontSize: 32,
          textAlign: "center",
          marginBottom: "2rem",
        }}
      >
        Servicios Ofrecidos
      </h2>
{servicios.map((servicio) => {
  const mascota = mascotas.find(m => m.idMascota === servicio.idMascota);

  return (
    <div key={servicio.idActividad} style={cardStyle}>
      <h3
        style={{
          fontFamily: "Madimi One, cursive",
          fontSize: 22,
          marginBottom: ".5rem",
        }}
      >
        {servicio.tipoActividad}
      </h3>

      {/* Mostrar nombre mascota */}
      <p>
        <strong>Mascota:</strong> {mascota ? mascota.nombreMascota : "Desconocida"}
      </p>

      <p>
        <strong>Fecha inicio:</strong> {formatearFecha(servicio.fechaInicio)}
      </p>
      <p>
        <strong>Fecha fin:</strong> {formatearFecha(servicio.fechaFinal)}
      </p>
      <p>
        <strong>Precio:</strong> {servicio.precio} 🪙
      </p>
      <div>
        <p>
          <strong>Animales admitidos:</strong> {servicio.finalizado ? "Finalizado" : "Pendiente"}
        </p>
        {!servicio.finalizado && (
          <button
            onClick={() => finalizarServicio(servicio.idActividad)}
            style={{
              borderRadius: "4px",
              backgroundColor: "#e74c3c",
              color: "#fff",
              border: "none",
              padding: "0.5rem 1rem",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Finalizar servicio
          </button>
        )}
      </div>
    </div>
  );
})}

    </div>
  );
};

export default ServiciosLista;
