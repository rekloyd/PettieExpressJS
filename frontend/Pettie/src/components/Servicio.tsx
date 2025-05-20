/**
 * Componente Servicio que muestra todos los servicios filtrados por params a partir de un fetch.
 *
 * @author Pau
 * @author Didac Morillas
 * @version 0.5.1
 * @date 2025-05-19
 */

import { useState } from "react";
import SearchComponent from './searchComponent';  
import ResultComponent from './resultComponent';  

const Servicio = () => {
  const [resultados, setResultados] = useState<any[]>([]);  // Almacena los resultados de la búsqueda

  // Maneja la búsqueda, recibimos los parámetros de búsqueda como URLSearchParams
  const handleSearch = async (params: URLSearchParams) => {
    const url = `http://localhost:4000/api/servicios/filtered?${params.toString()}`;
    console.log('URL de la petición:', url); // Agregado para hacer log de la URL

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error('Error en la petición');

      const data = await response.json();
      setResultados(data);  // Guardamos los resultados de la búsqueda
    } catch (error) {
      console.error('Error al obtener los servicios:', error);
    }
  };

  return (
    <div
      style={{
        fontFamily: "Inter, sans-serif",
        maxWidth: "1700px",
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

      {/* Agregamos el SearchComponent */}
      <div
        style={{
          width: "100%",
          marginTop: "3rem",

        }}
      >
        <SearchComponent onSearch={handleSearch} /> {/* Usamos el componente de búsqueda */}
      </div>

      {/* Mostramos los resultados de la búsqueda */}
      {resultados.length > 0 ? (
        <div
          style={{
            padding: "2rem",
            display: "flex",
            flexWrap: "wrap",
            gap: "1rem",
            justifyContent: "center",
          }}
        >
          <ResultComponent resultados={resultados} /> {/* Usamos el componente de resultados */}
        </div>
      ) : (
        <span></span>
      )}
    </div>
  );
};

export default Servicio;
