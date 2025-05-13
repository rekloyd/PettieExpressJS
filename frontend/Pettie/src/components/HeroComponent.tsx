import React, { useState } from 'react';
import '../heroComponent.css';
import heroimg from '../assets/bg-hero.jpg';

const HeroComponent: React.FC = () => {


    // const buscarActividades = async () =>{
    //     await fetch()
    // }

  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  const handleSizeChange = (size: string) => {
    setSelectedSize(size);
  };

  return (
    <section className="hero">
      {/* Imagen de fondo */}
      <div className="hero__bg">
        <img src={heroimg} alt="Hero placeholder" className="hero__img" />
        <div className="hero__overlay" />
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
      </div>

      {/* Tarjeta de búsqueda */}
      <div className="search-card">
        <div className='search-card-content'>
        <h2 className="search-card__heading">
          Encuentra el servicio que buscas para tu mascota
        </h2>
        <form className="search-card__form">
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
              <legend className="form-label">
                Elige el precio de la actividad:
              </legend>
              <select id="price" className="form-select" style={
                {width:"90%", height:"90px",fontSize:"1.3rem"}
              }>
                <option value="" disabled>Elige el precio de la actividad</option>
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
            />
            {/* Botón */}
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
