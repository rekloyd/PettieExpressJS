import React from 'react';
import '../styles/bestpettier.css'; // reutilizamos estilos
import type { Servicio } from '../interfaces/interfaces';
import fotoUsuario from "../assets/face1.jpg";
import { useNavigate } from 'react-router-dom'; // Importar el hook

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
      <img
        src={fotoUsuario} // Imagen por defecto o podrías usar una propiedad del backend
        alt={servicio.tipoActividad}
        className="pettier-img"
      />
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
