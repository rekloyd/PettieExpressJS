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
            <option value="20">20€</option>
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
  );
};

export default SearchComponent;
