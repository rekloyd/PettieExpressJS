/**
 * Componente ServicioCard que formatea en forma de carta los resultado de servicios obtenidos previamente.
 *
 * @author Pau
 * @author Didac Morillas
 * @version 0.5.1
 * @date 2025-05-19
 */

import React from 'react';
import '../styles/bestpettier.css';
import type { Servicio } from '../interfaces/interfaces';

import { useNavigate } from 'react-router-dom'; 

interface ServicioCardProps {
  servicio: Servicio;
}

const ServicioCard: React.FC<ServicioCardProps> = ({ servicio }) => {
  // Verificamos que el nombreUsuario no esté vacío o no definido
  console.log('Contenido recibido para mostrar:', servicio);
  const nombreUsuario = servicio.nombreUsuario ? servicio.nombreUsuario : "Nombre no disponible";
  const idPettier = servicio.idPettier;

  // Usamos useNavigate para redirigir
  const navigate = useNavigate();

  const handleClick = () => {
    // Navegar a la ruta dinámica basada en el idPettier
    navigate(`/dashboard/${idPettier}`);
  };

  return (
    <div className="pettier-card" style={{ marginRight: '5px;' }}>
      <div className="pettier-info">
        <h2 style={{ fontSize: '30px', fontFamily: 'Madimi One' }}>{nombreUsuario}</h2>
        <h3 style={{ fontSize: '20px' }}>{servicio.tipoActividad}</h3>
        <div className="icons">
          <div className="icon-placeholder">📅</div>
          <div className="icon-placeholder">💰</div>
          <div className="icon-placeholder">🐾</div>
        </div>
        <p>
          {servicio.precio}€ - Desde el {new Date(servicio.fechaInicio).toLocaleDateString()}
        </p>
        <button className="buyButton" style={{ marginBottom: "10px;" }} onClick={handleClick}>
          Ver más
        </button>
      </div>
    </div>
  );
};

export default ServicioCard;
