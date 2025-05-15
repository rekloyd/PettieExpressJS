import React, { useState } from 'react';
import '../heroComponent.css';
import heroimg from '../assets/bg-hero.jpg';
import BestPettier from '../components/BestPettier';
import SearchComponent from './searchComponent';
import type { Servicio } from '../interfaces/interfaces';
import ResultComponent from './resultComponent';

const HeroComponent: React.FC = () => {
  const [resultados, setResultados] = useState<Servicio[]>([]);

  const handleSearch = async (params: URLSearchParams) => {
    const url = `http://localhost:4000/api/servicios/filtered?${params.toString()}`;
    console.log('URL de la petición:', url); // Agregado para hacer log de la URL

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
    <section className="hero">
      {/* Imagen de fondo */}
      <div className="hero__bg">
        <img src={heroimg} alt="Hero placeholder" className="hero__img" />
        <div className="hero__overlay" />
        <div className="hero__content">
          <h1 className="hero__title">
            Servicios de cuidado de Mascotas en tu ciudad
          </h1>
          <p className="hero__subtitle">
            Cuidadores de mascota en tu misma ciudad. Encuentra paseadores,
            pet sitters y otros servicios para tus animales.
          </p>
        </div>
      </div>

      {/* Tarjeta de búsqueda */}
      <div className="search-card">
        <div className="search-card-content">
          <h2 className="search-card__heading">
            Encuentra el servicio que buscas para tu mascota
          </h2>
          <SearchComponent onSearch={handleSearch} /> {/* Usamos el nuevo componente */}
        </div>
      </div>

      {/* Resultados de la búsqueda */}
      <ResultComponent resultados={resultados} /> {/* Usamos ResultComponent para mostrar los resultados */}

      {/* Mejores pet sitters */}
      <BestPettier />
    </section>
  );
};

export default HeroComponent;
