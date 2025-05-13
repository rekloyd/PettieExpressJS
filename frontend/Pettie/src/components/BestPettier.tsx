import React, { useEffect } from "react";
import "../styles/bestpettier.css";
import pettier1 from "../assets/face1.jpg";
import pettier2 from "../assets/logo.png";
import pettier3 from "../assets/logo.png";

const pettiers = [
  {
    nombre: "Rashid Kasimiri",
    descripcion: "A partir de 16€/h",
    imagen: pettier1,
  },
  {
    nombre: "Carlos Gómez",
    descripcion: "Amable y confiable, cuida de cada mascota como si fuera suya.",
    imagen: pettier2,
  },
  {
    nombre: "Lucía Fernández",
    descripcion: "Especializada en perros mayores, ofrece atención y cariño incondicional.",
    imagen: pettier3,
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
      <h2 className="section-title" style={{fontFamily: "Madimi One, cursive", fontSize:'64px'}}>Los cuidadores más top cerca de ti</h2>
      <div className="pettier-grid">
        {pettiers.map((pettier, index) => (
          <div className="pettier-card" key={index}>
            <img src={pettier.imagen} alt={pettier.nombre} className="pettier-img" />
            <div className="pettier-info">
              <h3 style={{fontSize:'30px'}}>{pettier.nombre}</h3>
              <div className="icons">
                {/* Placeholders */}
                <div className="icon-placeholder">❤️</div>
                <div className="icon-placeholder">🛡️</div>
                <div className="icon-placeholder">🐾</div>
              </div>
              <p>{pettier.descripcion}</p>
              <button className="buyButton">Comprar</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BestPettier;
