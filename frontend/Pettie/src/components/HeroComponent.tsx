import React, { useState } from 'react';
import '../heroComponent.css';
import heroimg from '../assets/bg-hero.jpg';
import BestPettier from '../components/BestPettier';
import ServicioCard from '../components/ServicioCard';
import type { Servicio } from '../interfaces/interfaces';

const HeroComponent: React.FC = () => {
  const [tipoActividad, setTipoActividad] = useState<string>(''); // Cambié el estado a tipoActividad
  const [precio, setPrecio] = useState<string>('');
  const [tamanoMascota, setTamanoMascota] = useState<string>(''); // Nuevo estado para tamaño
  const [resultados, setResultados] = useState<Servicio[]>([]);

  const handleSizeChange = (size: string) => {
    setTamanoMascota(size); // Cambié el estado de tamanoMascota
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Crea el objeto con los parámetros de búsqueda
    const params = new URLSearchParams();

    if (precio) params.append('price', precio); 
    if (tipoActividad) params.append('tipoActividad', tipoActividad);
    if (tamanoMascota) params.append('tamanoMascota', tamanoMascota); // Añadido el tamaño

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
          <form className="search-card__form" onSubmit={handleSubmit}>
            <fieldset className="form-group sizes">
              <legend>Tamaño de tu mascota</legend>
              {[{ label: 'Pequeño (0–7kg)', icon: '🐱', value: 'pequeno' },
                { label: 'Mediano (7–18kg)', icon: '🐶', value: 'mediano' },
                { label: 'Grande (+45kg)', icon: '🐕', value: 'grande' }].map((opt) => (
                  <label
                    key={opt.value}
                    className={`sizes__option ${tamanoMascota === opt.value ? 'selected' : ''}`}
                  >
                    <input
                      type="radio"
                      name="size"
                      value={opt.value}
                      onChange={() => handleSizeChange(opt.value)} // Cambié el manejador de cambio
                    />
                    <span className="sizes__icon">{opt.icon}</span>
                    <span className="sizes__label">{opt.label}</span>
                  </label>
                ))}
              {/* Precio */}
              <div className="contenedorPrecio">
                <legend className="form-label">Elige el precio de la actividad:</legend>
                <select
                  id="precio"
                  className="form-select"
                  value={precio}
                  onChange={(e) => setPrecio(e.target.value)}
                  style={{ width: '90%', height: '90px', fontSize: '1.3rem' }}
                >
                  <option value="" disabled>
                    Elige el precio de la actividad
                  </option>
                  <option value="10">10€</option>
                  <option value="15">15€</option>
                  <option value="more">+15€</option>
                </select>
              </div>
            </fieldset>

            {/* Nombre de la actividad */}
            <div className="form-group form-input-btn">
              <input
                type="text"
                className="form-control-input"
                placeholder="Nombre de la actividad..."
                value={tipoActividad}
                onChange={(e) => setTipoActividad(e.target.value)}
              />
              <button type="submit" className="btnL">
                Buscar
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Resultados de la búsqueda */}
      {resultados.length > 0 && (
        <div style={{ padding: '2rem' }}>
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
        </div>
      )}

      {/* Mejores pet sitters */}
      <BestPettier />
    </section>
  );
};

export default HeroComponent;
