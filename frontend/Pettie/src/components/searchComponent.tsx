import React, { useState } from 'react';
import '../styles/searchComponent.css'


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

    onSearch(params);
  };

  return (
    <div className="container py-5">
      <form className="search-card__form" onSubmit={handleSubmit}>
        <h2 className="search-title">Encuentra el servicio que buscas para tu mascota</h2>

        <fieldset className="form-group">
          <legend className="form-label">Tamaño de tu mascota</legend>
          <div className="d-flex gap-3 flex-wrap sizes-options">
            {[
              { label: 'Pequeño (0–7kg)', icon: '🐱', value: 'pequeno' },
              { label: 'Mediano (7–18kg)', icon: '🐶', value: 'mediano' },
              { label: 'Grande (+45kg)', icon: '🐕', value: 'grande' },
            ].map((opt) => {
              const isSelected = tamanoMascota === opt.value;
              return (
                <label
                  key={opt.value}
                  className={`sizes__option p-2 border rounded ${isSelected ? 'selected' : ''}`}
                  style={{ cursor: 'pointer' }}
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

          <div className="mb-3">
            <label htmlFor="precio" className="form-label precio-label">
              Elige el precio de la actividad:
            </label>
            <select
              id="precio"
              className="form-select precio-select"
              value={precio}
              onChange={(e) => setPrecio(e.target.value)}
            >
              <option value="" disabled>
                Elige el precio de la actividad
              </option>
              <option value="10">10PC</option>
              <option value="15">15PC</option>
              <option value="20">20PC</option>
            </select>
          </div>
        </fieldset>

        <div className="mb-4 d-flex mt-3 flex-wrap">
          <input
            type="text"
            className="form-control flex-grow-1"
            placeholder="Nombre de la actividad..."
            value={tipoActividad}
            onChange={(e) => setTipoActividad(e.target.value)}
          />
          <button type="submit" className="btn btn-warning ms-2 mt-4 ">
            Buscar
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchComponent;
