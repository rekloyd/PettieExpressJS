import React, { useEffect } from "react";

const Contacto: React.FC = () => {
        useEffect(() => {
          const link = document.createElement("link");
          link.href =
            "https://fonts.googleapis.com/css2?family=Inter:wght@400;500&family=Madimi+One&display=swap";
          link.rel = "stylesheet";
          document.head.appendChild(link);
        }, []);
  return (
    <div
      className="container mt-5 mb-5"
      style={{
        fontFamily: "Inter, sans-serif",
        lineHeight: "1.8",
        textAlign: "center",
      }}
    >
      <h1 className="mb-4" style={{ fontSize: "2.5rem", fontWeight: "bold",fontFamily: "Madimi One, cursive" }}>
        Contáctanos
      </h1>

      <p className="mb-4">
        ¿Tienes dudas, sugerencias o necesitas ayuda? En <strong>Pettie</strong>{" "}
        estamos encantados de escucharte. Ya seas un{" "}
        <strong>Propietario</strong> o un <strong>Pettier</strong>, puedes
        contactarnos por los siguientes medios:
      </p>

      <div className="mb-4">
        <h2 style={{ fontSize: "1.5rem",fontFamily: "Madimi One, cursive" }}>Correo electrónico</h2>
        <p>
          📧 <a href="mailto:soporte@pettie.com">soporte@pettie.com</a>
        </p>
      </div>

      <div className="mb-4">
        <h2 style={{ fontSize: "1.5rem",fontFamily: "Madimi One, cursive" }}>Teléfono</h2>
        <p>
          📞 +34 622 555 999 <br />
          Horario de atención: Lunes a Viernes de 9:00 a 18:00
        </p>
      </div>

      <div className="mb-4">
        <h2 style={{ fontSize: "1.5rem",fontFamily: "Madimi One, cursive" }}>Redes sociales</h2>
        <ul style={{ listStyle: "none", paddingLeft: 0 }}>
          <li>
            🐾 Instagram:{" "}
            <a
              href="https://instagram.com/pettie"
              target="_blank"
              rel="noopener noreferrer"
            >
              @pettie
            </a>
          </li>
          <li>
            🐾 Facebook:{" "}
            <a
              href="https://facebook.com/pettie"
              target="_blank"
              rel="noopener noreferrer"
            >
              facebook.com/pettie
            </a>
          </li>
          <li>
            🐾 Twitter/X:{" "}
            <a
              href="https://twitter.com/pettie"
              target="_blank"
              rel="noopener noreferrer"
            >
              @pettie
            </a>
          </li>
        </ul>
      </div>
      <br /><br />
      <div className="mb-4 text-center">
        <h2 style={{ fontSize: "1.5rem", marginBottom: "20px", fontFamily: "Madimi One, cursive" }}>
          Formulario de contacto
        </h2>

        <form
          className="mx-auto"
          style={{ maxWidth: "600px", textAlign: "left" }}
        >
          <div className="mb-3">
            <label htmlFor="nombre" className="form-label">
              Nombre
            </label>
            <input type="text" className="form-control" id="nombre" required />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Correo electrónico
            </label>
            <input type="email" className="form-control" id="email" required />
          </div>
          <div className="mb-3">
            <label htmlFor="mensaje" className="form-label">
              Mensaje
            </label>
            <textarea className="form-control" id="mensaje" rows={5} required />
          </div>
          <div className="text-center">
            <button type="submit" className="btnLogin" style={{width:'180px', height:'70px', fontSize:'16px'}}>
              Enviar mensaje
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contacto;
