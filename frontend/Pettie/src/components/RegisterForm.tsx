import { useState, useEffect } from 'react';
import logo from '../assets/logo.png';
import '../styles/login.css';

export const RegisterForm = () => {
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [contrasenaUsuario, setContrasenaUsuario] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500&family=Madimi+One&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }, []);

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
    <div style={{ fontFamily: 'Inter, sans-serif', maxWidth: '600px', margin: 'auto', padding: '1rem', fontSize: '20px' }}>
<div style={{
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: '80px',
}}>
  <img 
    src={logo} 
    alt="Logo de Pettie" 
    style={{ marginBottom: '0px', width: '243px', height: '161px' }} 
  />
  <h2 style={{
    fontFamily: 'Madimi One, cursive',
    fontSize: '45px',
    fontWeight: '400',
    margin: '0',
    marginBottom: '80px',
    textAlign: 'center',
  }}>
    Crea tu cuenta
  </h2>
</div>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="nombreUsuario" style={{ display: 'block', marginBottom: '.5rem' }}>
            Nombre de usuario
          </label>
          <input
            type="text"
            id="nombreUsuario"
            name="nombreUsuario"
            required
            value={nombreUsuario}
            onChange={(e) => setNombreUsuario(e.target.value)}
            style={{ width: '100%', padding: '.75rem', fontSize: '1rem', borderRadius: '5px', border: 'black 1px solid'}}
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="contrasenaUsuario" style={{ display: 'block', marginBottom: '.5rem'}}>
            Contraseña
          </label>
          <input
            type="password"
            id="contrasenaUsuario"
            name="contrasenaUsuario"
            required
            value={contrasenaUsuario}
            onChange={(e) => setContrasenaUsuario(e.target.value)}
            style={{ width: '100%', padding: '.75rem', fontSize: '1rem', borderRadius: '5px', border: 'black 1px solid'}}
          />
        </div>
        <div style={{textAlign: 'center'}}>
        <button type="submit" className='btn'>
          Iniciar sesión
        </button>
        <br /><br /><br />
        <p>¿Todavía no tienes cuenta?</p><a href="">Regístrate aquí</a>
        </div>

        {error && (
          <p style={{ display: 'block', marginTop: '1rem', color: 'red' }}>
            {error}
          </p>
        )}
      </form>
    </div>
  );
};
