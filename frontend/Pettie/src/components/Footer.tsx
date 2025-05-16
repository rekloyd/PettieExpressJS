import React, { useEffect } from 'react';


const Footer: React.FC = () => {
  useEffect(() => {
    const link = document.createElement('link');
    link.href =
      'https://fonts.googleapis.com/css2?family=Inter:wght@400;500&family=Madimi+One&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }, []);
  return (
    <footer style={{ backgroundColor: '#5D3D12',fontFamily:"Inter,sans-serif" }} className="text-light py-5 px-4">
      <div className="container">
        <div className="d-flex flex-column flex-lg-row justify-content-between gap-4">
          {/* Primera lista */}
          <div>
            <h5>Enlaces útiles</h5>
            <ul className="list-unstyled">
              <li><a href="/" className="text-light text-decoration-none">Inicio</a></li>
              <li><a href="/servicios" className="text-light text-decoration-none">Servicios</a></li>
              <li><a href="/blog" className="text-light text-decoration-none">Blog</a></li>
              <li><a href="/contacto" className="text-light text-decoration-none">Contacto</a></li>
            </ul>
          </div>


          {/* Formulario */}
          <div style={{ minWidth: '250px' }}>
            <h5>Suscríbete a nuestra newsletter</h5>
            <form>
              <div>
                <input
                  type="email"
                  className="form-control"
                  id="newsletterEmail"
                  placeholder="Tu correo electrónico"
                  required
                />
              </div>
              <button type="submit" className="btn btn-light text-dark">
                Suscribirse
              </button>
            </form>
          </div>
        </div>

        <div className="text-center mt-4 small">
          &copy; {new Date().getFullYear()} Pettie. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
