import React, { useState } from 'react';
import heroimg from '../assets/bg-hero.jpg';
import BestPettier from '../components/BestPettier';
import SearchComponent from './searchComponent';
import type { Servicio } from '../interfaces/interfaces';
import ResultComponent from './resultComponent';

import '../styles/heroComponent.css';

const HeroComponent: React.FC = () => {
  const [resultados, setResultados] = useState<Servicio[]>([]);

  const handleSearch = async (params: URLSearchParams) => {
    const url = `http://localhost:4000/api/servicios/filtered?${params.toString()}`;
    console.log('URL de la petición:', url);

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error('Error en la petición');

      const data: Servicio[] = await response.json();
      setResultados(data);
    } catch (error) {
      console.error('Error al obtener los servicios:', error);
    }
  };

  return (
    <section className="hero-wrapper" style={{ fontFamily: 'Inter, sans-serif', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {/* Imagen de fondo */}
      <div className="hero-section">
        <img src={heroimg} alt="Hero placeholder" className="hero-img" />
        <div className="hero-overlay" />
        <div className="hero-text">
          <h1>Servicios de cuidado de Mascotas en tu ciudad</h1>
          <p>
            Cuidadores de mascota en tu misma ciudad. Encuentra paseadores,
            pet sitters y otros servicios para tus animales.
          </p>
        </div>
      </div>

      {/* Tarjeta de búsqueda */}
      <div className="search-container">
        <div className="search-inner">
          <SearchComponent onSearch={handleSearch} />
        </div>
      </div>

      {/* Resultados de la búsqueda */}
      <div className="resultados-container">
        <ResultComponent resultados={resultados} />
      </div>

      {/* Mejores pet sitters */}
      <BestPettier />
    </section>
  );
};

export default HeroComponent;
