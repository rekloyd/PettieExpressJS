import React, { useState } from 'react';
import '../heroComponent.css';
import heroimg from '../assets/bg-hero.jpg';
import type { Servicio } from '../interfaces/interfaces';


const HeroComponent: React.FC = () => {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [activityName, setActivityName] = useState<string>('');
  const [price, setPrice] = useState<string>('');

  const handleSizeChange = (size: string) => {
    setSelectedSize(size);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:4000/api/servicios');
      if (!response.ok) throw new Error('Error en la petición');

      const data: Servicio[] = await response.json();
      console.log('Servicios recibidos:', data);
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

      <div className="search-card">
        <div className="search-card-content">
          <h2 className="search-card__heading">
            Encuentra el servicio que buscas para tu mascota
          </h2>
          <form className="search-card__form" onSubmit={handleSubmit}>
            <fieldset className="form-group sizes">
              <legend>Tamaño de tu mascota</legend>
              {[
                { label: 'Pequeño (0–7kg)', icon: '🐱', value: 'pequeno' },
                { label: 'Mediano (7–18kg)', icon: '🐶', value: 'mediano' },
                { label: 'Grande (+45kg)', icon: '🐕', value: 'grande' },
              ].map((opt) => (
                <label
                  key={opt.value}
                  className={`sizes__option ${selectedSize === opt.value ? 'selected' : ''}`}
                >
                  <input
                    type="radio"
                    name="size"
                    value={opt.value}
                    onChange={() => handleSizeChange(opt.value)}
                  />
                  <span className="sizes__icon">{opt.icon}</span>
                  <span className="sizes__label">{opt.label}</span>
                </label>
              ))}

              {/* Precio */}
              <div className="contenedorPrecio">
                <legend className="form-label">Elige el precio de la actividad:</legend>
                <select
                  id="price"
                  className="form-select"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
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
                value={activityName}
                onChange={(e) => setActivityName(e.target.value)}
              />
              <button type="submit" className="btnL">
                Buscar
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default HeroComponent;
