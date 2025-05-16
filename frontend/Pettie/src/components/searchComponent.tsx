import React, { useState } from 'react';

// Componente de búsqueda que se usa en el bloque principal.
interface SearchComponentProps {
  onSearch: (params: URLSearchParams) => void;
}

const SearchComponent: React.FC<SearchComponentProps> = ({ onSearch }) => {
  const [tipoActividad, setTipoActividad] = useState<string>('');
  const [precio, setPrecio] = useState<string>('');
  const [tamanoMascota, setTamanoMascota] = useState<string>('');

  const handleSizeChange = (size: string) => {
    setTamanoMascota(size);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const params = new URLSearchParams();

    if (precio) params.append('price', precio);
    if (tipoActividad) params.append('tipoActividad', tipoActividad);
    if (tamanoMascota) params.append('tamanoMascota', tamanoMascota);

    onSearch(params); // Llama a la función onSearch pasada como prop
  };

  return (
    <div className="container py-5"> {/* Usamos el contenedor para centrar el formulario y darle más espacio */}
      <form className="search-card__form" onSubmit={handleSubmit}
        style={{
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Drop shadow en el contenedor
          borderRadius: '10px', // Borde redondeado para el contenedor
          padding: '20px', // Espaciado interno para un diseño más limpio
          backgroundColor: '#fff' // Color de fondo blanco
        }}
      
      
      >
        <h2 style={{fontFamily:'Madimi One', textAlign:'left'}}>
            Encuentra el servicio que buscas para tu mascota
          </h2>
        <fieldset className="form-group">
          <legend className="form-label">Tamaño de tu mascota</legend>
<div className="d-flex gap-3 flex-wrap">
  {[
    { label: 'Pequeño (0–7kg)', icon: '🐱', value: 'pequeno' },
    { label: 'Mediano (7–18kg)', icon: '🐶', value: 'mediano' },
    { label: 'Grande (+45kg)', icon: '🐕', value: 'grande' },
  ].map((opt) => {
    const isSelected = tamanoMascota === opt.value;

      return (
        <label
          key={opt.value}
          className={`sizes__option p-2 border rounded`}
          style={{
            cursor: 'pointer',
            border: isSelected ? '1px solid #8B4513' : '1px solid #ccc',
            boxShadow: isSelected ? '0 4px 8px rgba(139, 69, 19, 0.4)' : 'none',
            transition: 'all 0.2s ease-in-out',
            backgroundColor: isSelected ? '#fefaf6' : '#fff',
          }}
        >
          <input
            type="radio"
            name="size"
            value={opt.value}
            onChange={() => handleSizeChange(opt.value)}
            className="d-none"
          />
          <span className="sizes__icon fs-3">{opt.icon}</span>
          <span className="sizes__label ms-2">{opt.label}</span>
        </label>
      );
    })}
  </div>


          {/* Precio */}
          <div className="mb-3">

            <label htmlFor="precio" className="form-label" style={{textAlign:'left',marginTop:'7px',fontSize: "20px",}}>Elige el precio de la actividad:</label>
            <select
              id="precio"
              style={{width:"450px"}}
              className="form-select"
              value={precio}
              onChange={(e) => setPrecio(e.target.value)
                
              }
            >
              <option value="" disabled>
                Elige el precio de la actividad
              </option>
              <option value="10">10€</option>
              <option value="15">15€</option>
              <option value="20">20€</option>
            </select>
          </div>
        </fieldset>

        {/* Nombre de la actividad */}
        <div className="mb-3 d-flex mt-3">
          <input
            type="text"
            className="form-control"
            placeholder="Nombre de la actividad..."
            value={tipoActividad}
            onChange={(e) => setTipoActividad(e.target.value)}
          />
          <button type="submit" className="btn btn-warning ms-2">
            Buscar
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchComponent;

