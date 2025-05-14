// src/components/Servicio.tsx
import { useEffect } from "react";

const Servicio = () => {
  useEffect(() => {
    const link = document.createElement("link");
    link.href =
      "https://fonts.googleapis.com/css2?family=Inter:wght@400;500&family=Madimi+One&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }, []);

  return (
    <div
      style={{
        fontFamily: "Inter, sans-serif",
        maxWidth: "1100px",
        margin: "auto",
        padding: "2rem 1rem",
        fontSize: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "2rem",
        marginTop: "80px",
      }}
    >
      <h2
        style={{
          fontFamily: "Madimi One, cursive",
          fontSize: "45px",
          fontWeight: 400,
          marginBottom: "2rem",
          textAlign: "center",
        }}
      >
        Servicios de Pettie
      </h2>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "2rem",
          justifyContent: "center",
          width: "100%",
        }}
      >
        {/* Carta del Pettier */}
        <div
          style={{
            flex: "1 1 450px",
            border: "1px solid #ccc",
            borderRadius: "15px",
            padding: "2rem",
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
            backgroundColor: "#fff",
          }}
        >
          <h3
            style={{
              fontFamily: "Madimi One, cursive",
              fontSize: "32px",
              marginBottom: "1rem",
              textAlign: "center",
            }}
          >
            Pettier 🐕🦺
          </h3>
          <p style={{ lineHeight: "1.6", textAlign: "justify", marginBottom: "1rem" }}>
            Como Pettier, puedes ofrecer servicios personalizados y de confianza para los dueños que necesiten ayuda con sus mascotas. Los servicios disponibles incluyen:
          </p>
          <ul style={{ paddingLeft: "1.5rem", lineHeight: "1.6" }}>
            <li>🏠 Alojamiento en casa del cuidador</li>
            <li>🛏️ Guardería en el domicilio del cliente</li>
            <li>🐾 Paseos personalizados</li>
            {/* <li>🕐 Guardería de un día</li>
            <li>🏡 Visitas al domicilio</li>
            <li>✂️ Peluquería para mascotas</li> */}
          </ul>
        </div>

        {/* Carta del Propietario */}
        <div
          style={{
            flex: "1 1 450px",
            border: "1px solid #ccc",
            borderRadius: "15px",
            padding: "2rem",
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
            backgroundColor: "#fff",
          }}
        >
          <h3
            style={{
              fontFamily: "Madimi One, cursive",
              fontSize: "32px",
              marginBottom: "1rem",
              textAlign: "center",
            }}
          >
            Propietario 😼🏠
          </h3>
          <p style={{ lineHeight: "1.6", textAlign: "justify" }}>
            Si eres propietario, puedes registrar a tus mascotas en la plataforma y asegurarte de que siempre estén cubiertas. Cuando surja una necesidad, podrás encontrar rápidamente un Pettier que ofrezca exactamente lo que necesitas, desde paseos hasta alojamiento temporal o cuidados especiales.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Servicio;
