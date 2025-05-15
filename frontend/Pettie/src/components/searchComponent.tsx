import React, { useState } from 'react';

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
    <form className="search-card__form" onSubmit={handleSubmit}>
      <fieldset className="form-group">
        <legend className="form-label">Tamaño de tu mascota</legend>
        <div className="d-flex gap-3 flex-wrap">
          {[{ label: 'Pequeño (0–7kg)', icon: '🐱', value: 'pequeno' },
            { label: 'Mediano (7–18kg)', icon: '🐶', value: 'mediano' },
            { label: 'Grande (+45kg)', icon: '🐕', value: 'grande' }].map((opt) => (
              <label
                key={opt.value}
                className={`sizes__option ${tamanoMascota === opt.value ? 'selected' : ''} p-2 border rounded`}
              >
                <input
                  type="radio"
                  name="size"
                  value={opt.value}
                  onChange={() => handleSizeChange(opt.value)}
                  className="d-none"
                />
                <span className="sizes__icon fs-3">{opt.icon}</span>
                <span className="sizes__label">{opt.label}</span>
              </label>
          ))}
        </div>

        {/* Precio */}
        <div className="mb-3">
          <label htmlFor="precio" className="form-label">Elige el precio de la actividad:</label>
          <select
            id="precio"
            className="form-select"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
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
      <div className="mb-3 d-flex align-items-center mt-3"> {/* Agregado mt-3 aquí */}
        <input
          type="text"
          className="form-control"
          placeholder="Nombre de la actividad..."
          value={tipoActividad}
          onChange={(e) => setTipoActividad(e.target.value)}
        />
        <button type="submit" className="btn btn-warning ms-2"> {/* Agregado mt-3 aquí */}
          Buscar
        </button>
      </div>
    </form>
  );
};

export default SearchComponent;
