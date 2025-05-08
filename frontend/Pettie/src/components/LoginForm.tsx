import { useState } from 'react';
import '../styles/login.css';

export const LoginForm = () => {
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [contrasenaUsuario, setContrasenaUsuario] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:4000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombreUsuario, contrasenaUsuario }),
      });

      const result = await response.json();

      if (response.ok) {
        alert('Login exitoso');
        window.location.href = '/';
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError('Hubo un error al procesar la solicitud.');
      console.log(err);
    }
  };

  return (
    <div className="login-container">
      <h2>Iniciar sesión</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nombreUsuario">Nombre de usuario</label>
          <input
            type="text"
            id="nombreUsuario"
            name="nombreUsuario"
            required
            value={nombreUsuario}
            onChange={(e) => setNombreUsuario(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="contrasenaUsuario">Contraseña</label>
          <input
            type="password"
            id="contrasenaUsuario"
            name="contrasenaUsuario"
            required
            value={contrasenaUsuario}
            onChange={(e) => setContrasenaUsuario(e.target.value)}
          />
        </div>
        <button type="submit" className="btn-submit">
          Iniciar sesión
        </button>
        {error && <p id="error-message" style={{ display: 'block' }}>{error}</p>}
      </form>
    </div>
  );
};