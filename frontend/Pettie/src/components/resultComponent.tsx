import React from 'react';
import ServicioCard from './ServicioCard'; // Importamos el componente que muestra cada servicio
import type { Servicio } from '../interfaces/interfaces';

interface ResultComponentProps {
  resultados: Servicio[];
}

const ResultComponent: React.FC<ResultComponentProps> = ({ resultados }) => {
  return (
    <div style={{ padding: '2rem' }}>
      {resultados.length > 0 ? (
        <>
          <h3 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Resultados de búsqueda</h3>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '1rem',
              justifyContent: 'flex-start',
            }}
          >
            {resultados.map((servicio, index) => (
              <ServicioCard key={index} servicio={servicio} />
            ))}
          </div>
        </>
      ) : (
        <h3 style={{ fontSize: '1.5rem' }}>No hay resultados para esta búsqueda.</h3>
      )}
    </div>
  );
};

export default ResultComponent;
