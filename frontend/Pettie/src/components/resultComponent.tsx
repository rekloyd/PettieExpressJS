import React from 'react';
import ServicioCard from './ServicioCard';
import type { Servicio } from '../interfaces/interfaces';
import '../styles/resultcomponent.css'; // Importa el CSS externo

interface ResultComponentProps {
  resultados: Servicio[];
}

const ResultComponent: React.FC<ResultComponentProps> = ({ resultados }) => {
  return (
    <div className="result-container">
      {resultados.length > 0 ? (
        <>
          <h3 className="result-title">Resultados de búsqueda</h3>
          <div className="result-grid">
            {resultados.map((servicio, index) => (
              <div className="result-col" key={index}>
                <ServicioCard servicio={servicio} />
              </div>
            ))}
          </div>
        </>
      ) : (
        <h3 className="no-results">No hay resultados</h3>
      )}
    </div>
  );
};

export default ResultComponent;
