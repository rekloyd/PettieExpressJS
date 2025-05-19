import React, { useEffect } from "react";
import "../styles/bestpettier.css";

const pettiers = [
  {
    nombre: "Jie Li",
    descripcion: "Especializado en gatos jóvenes, ofrece atención y tiempo de calidad.",
    url: 'http://localhost:5173/dashboard/19',
  },
  {
    nombre: "Laura Jimenez",
    descripcion: "Amable y confiable, cuida de cada mascota como si fuera suya, inclusive mejor aún.",
    url: 'http://localhost:5173/dashboard/20',
  },
  {
    nombre: "Luis Alberto",
    descripcion: "Especializada en perros mayores, ofrece atención y cariño incondicional.",
    url: 'http://localhost:5173/dashboard/21',
  },
];

const BestPettier: React.FC = () => {
  useEffect(() => {
    const link = document.createElement("link");
    link.href =
      "https://fonts.googleapis.com/css2?family=Inter:wght@400;500&family=Madimi+One&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }, []);

  return (
    <div className="bestpettier-container">
      <h2
        className="section-title"
        style={{ fontFamily: "Madimi One, cursive", fontSize: "64px" }}
      >
        Los cuidadores más top cerca de ti
      </h2>
      <div className="pettier-grid">
        {pettiers.map((pettier, index) => (
          <div className="pettier-card" key={index}>
            <div className="pettier-info">
              <h3 style={{ fontSize: "30px" }}>{pettier.nombre}</h3>
              <div className="icons">
                <div className="icon-placeholder">❤️</div>
                <div className="icon-placeholder">🛡️</div>
                <div className="icon-placeholder">🐾</div>
              </div>
              <p>{pettier.descripcion}</p>
              <a
                href={pettier.url}
                className="buyButton"
                style={{ textDecoration: "none", color: "inherit", padding:'10px 20px'}}
              >
                Ver más
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BestPettier;
