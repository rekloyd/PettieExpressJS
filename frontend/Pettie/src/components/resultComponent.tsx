import React from 'react';
import ServicioCard from './ServicioCard'; // Importamos el componente que muestra cada servicio
import type { Servicio } from '../interfaces/interfaces';

interface ResultComponentProps {
  resultados: Servicio[];
}

const ResultComponent: React.FC<ResultComponentProps> = ({ resultados }) => {
  return (
    <div className="container py-4">
      {resultados.length > 0 ? (
        <>
          <h3 className="fs-3 mb-4">Resultados de búsqueda</h3>
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
            {resultados.map((servicio, index) => (
              <div className="col" key={index}>
                <ServicioCard servicio={servicio} />
              </div>
            ))}
          </div>
        </>
      ) : (
        <h3 className="fs-4">No hay resultados para esta búsqueda.</h3>
      )}
    </div>
  );
};

export default ResultComponent;
