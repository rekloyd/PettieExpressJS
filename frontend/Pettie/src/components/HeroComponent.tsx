import React from 'react';
import '../App.css';

const HeroComponent: React.FC = () => {
  return (
    <section className="hero">
      {/* Imagen de fondo */}
      <div className="hero__bg">
        <img
          src="https://via.placeholder.com/1600x600?text=Tu+Imagen+Aquí"
          alt="Hero placeholder"
          className="hero__img"
        />
        <div className="hero__overlay" />
      </div>

      {/* Texto principal */}
      <div className="hero__content">
        <h1 className="hero__title">
          Servicios de cuidado de Mascotas en tu ciudad
        </h1>
        <p className="hero__subtitle">
          Cuidadores de mascota en tu misma ciudad. Encuentra paseadores,
          pet sitters y otros servicios para tus animales.
        </p>
      </div>

      {/* Tarjeta de búsqueda */}
      <div className="search-card">
        <h2 className="search-card__heading">
          Encuentra el servicio que buscas para tu mascota
        </h2>
        <form className="search-card__form">
          {/* Tamaño de la mascota */}
          <fieldset className="form-group sizes">
            <legend className="visually-hidden">Tamaño de tu mascota</legend>
            {[
              { label: 'Pequeño (0–7kg)', icon: '🐱' },
              { label: 'Mediano (7–18kg)', icon: '🐶' },
              { label: 'Grande (+45kg)', icon: '🐕' },
            ].map((opt) => (
              <label key={opt.label} className="sizes__option">
                <span className="sizes__icon">{opt.icon}</span>
                <span className="sizes__label">{opt.label}</span>
                <input type="radio" name="size" />
              </label>
            ))}
          </fieldset>

          {/* Precio */}
          <div className="form-group">
            <label htmlFor="price" className="form-label">
              Precio
            </label>
            <select id="price" className="form-select">
              <option value="">-- elige --</option>
              <option>€</option>
              <option>€€</option>
              <option>€€€</option>
            </select>
          </div>

          {/* Nombre de la actividad */}
          <div className="form-group fullwidth">
            <input
              type="text"
              className="form-control"
              placeholder="Nombre de la actividad..."
            />
          </div>

          {/* Botón */}
          <button type="submit" className="btn btn--primary">
            Buscar
          </button>
        </form>
      </div>
    </section>
  );
};

export default HeroComponent;
