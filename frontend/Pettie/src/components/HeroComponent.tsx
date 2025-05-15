import React, { useState } from 'react';
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
    <section style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', fontFamily: 'Inter, sans-serif' }}>
      {/* Imagen de fondo */}
      <div
        style={{
          display: 'grid',
          width: '85%',
          height: '70vh',
          minHeight: '300px',
          marginTop: '30px',
          borderRadius: '15px',
          overflow: 'hidden',
          backgroundColor: 'black',
        }}
      >
        <img src={heroimg} alt="Hero placeholder" style={{ gridArea: '1 / 1', width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', zIndex: 0 }} />
        <div style={{ gridArea: '1 / 1', background: 'rgba(0, 0, 0, 0.4)', width: '100%', height: '100%', zIndex: 1 }} />
        <div style={{
          gridArea: '1 / 1',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          padding: '5% 5% 0',
          color: '#fff',
          zIndex: 2,
          width: '100%',
          boxSizing: 'border-box'
        }}>
          <h1 style={{ fontSize: '5rem', marginBottom: '0.5rem', width: '90%', fontFamily: 'Madimi One' }}>
            Servicios de cuidado de Mascotas en tu ciudad
          </h1>
          <p style={{ fontSize: '2.5rem' }}>
            Cuidadores de mascota en tu misma ciudad. Encuentra paseadores,
            pet sitters y otros servicios para tus animales.
          </p>
        </div>
      </div>

      {/* Tarjeta de búsqueda */}
      <div style={{

        width: '63%',
        margin: '-10rem auto 2rem',
        borderRadius: '8px',
        padding: '1.5rem',
        // Se ha eliminado el box-shadow aquí
        zIndex: 10
      }}>
        <div style={{ width: '95%', marginLeft: '50px' }}>
          <SearchComponent onSearch={handleSearch} />
        </div>
      </div>

      {/* Resultados de la búsqueda */}
      <div style={{textAlign:'center'}}>
      <ResultComponent resultados={resultados} />
      </div>


      {/* Mejores pet sitters */}

      <BestPettier />

    </section>
  );
};

export default HeroComponent;
