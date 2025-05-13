import React, { useEffect } from "react";
import "../styles/nosotros.css";
import logoImg from "../assets/logo.png"; // Puedes cambiar por otras imágenes

const Nosotros: React.FC = () => {
      useEffect(() => {
        const link = document.createElement("link");
        link.href =
          "https://fonts.googleapis.com/css2?family=Inter:wght@400;500&family=Madimi+One&display=swap";
        link.rel = "stylesheet";
        document.head.appendChild(link);
      }, []);
  return (
    <div className="nosotros-container">
      
      {/* Misión */}
      <div className="nosotros-section">
        <div className="nosotros-text">
          <h2 style={{fontFamily: "Madimi One, cursive"}}>Nuestra Misión</h2>
          <p>
            En Pettie, nuestra misión es mejorar la vida de las mascotas y sus dueños ofreciendo una plataforma segura,
            fácil de usar y centrada en el bienestar animal. Conectamos a cuidadores apasionados —los Pettiers—
            con propietarios que buscan confianza y cariño para sus perros.
          </p>
        </div>
        <img src={logoImg} alt="Nuestra misión" className="nosotros-img" />
      </div>

      {/* Valores */}
      <div className="nosotros-section reverse">
        <div className="nosotros-text">
          <h2 style={{fontFamily: "Madimi One, cursive"}}>Valores que nos definen</h2>
          <p>
            Nuestros pilares son la <strong>confianza</strong>, el <strong>compromiso</strong> y el <strong>amor
            por los animales</strong>. Cada Pettier es seleccionado cuidadosamente para
            garantizar el cuidado más responsable y afectuoso. Nos mueve la
            empatía, la comunidad y la transparencia.
          </p>
        </div>
        <img src={logoImg} alt="Nuestros valores" className="nosotros-img" />
      </div>

      {/* Cultura */}
      <div className="nosotros-section">
        <div className="nosotros-text">
          <h2 style={{fontFamily: "Madimi One, cursive"}}>Cultura <i>Pettie</i></h2>
          <p>
            Creemos en una cultura colaborativa, inclusiva y flexible.
            Promovemos el respeto mutuo, la formación constante y el crecimiento
            personal. En Pettie, cada miembro es importante: desde el dueño
            hasta el cuidador, y por supuesto, cada perro.
          </p>

      </div>
      </div>
      <div style={{textAlign:'center'}}>
      <img src={logoImg} alt="Nuestra cultura" className="nosotros-img" />
      </div>

    </div>
  );
};

export default Nosotros;
