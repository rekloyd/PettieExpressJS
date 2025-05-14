import React from 'react';
import '../styles/bestpettier.css'; // reutilizamos estilos
import type { Servicio } from '../interfaces/interfaces';

interface ServicioCardProps {
  servicio: Servicio;
}

const ServicioCard: React.FC<ServicioCardProps> = ({ servicio }) => {
  return (
    <div className="pettier-card">
      <img
        src="/default-pet.png" // Imagen por defecto o podrías usar una propiedad del backend
        alt={servicio.tipoActividad}
        className="pettier-img"
      />
      <div className="pettier-info">
        <h3 style={{ fontSize: '30px' }}>{servicio.tipoActividad}</h3>
        <div className="icons">
          <div className="icon-placeholder">📅</div>
          <div className="icon-placeholder">💰</div>
          <div className="icon-placeholder">🐾</div>
        </div>
        <p>
          {servicio.precio}€ - Desde el {new Date(servicio.fechaInicio).toLocaleDateString()}
        </p>
        <button className="buyButton">Ver más</button>
      </div>
    </div>
  );
};

export default ServicioCard;
