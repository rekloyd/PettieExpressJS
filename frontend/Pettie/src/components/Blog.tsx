import React, { useState, useEffect } from "react";

const Blog: React.FC = () => {
  const [selected, setSelected] = useState<number | null>(null);
  const [page, setPage] = useState(0);
  const pageSize = 3;

  useEffect(() => {
    const link = document.createElement("link");
    link.href =
      "https://fonts.googleapis.com/css2?family=Inter:wght@400;500&family=Madimi+One&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }, []);

  const blogs = [
    { title: "Alimentación Canina", summary: "Descubre los mejores consejos para mantener una dieta equilibrada para tu perro.", content: `
        Una buena alimentación es clave para la salud de tu perro. Opta por alimentos ricos en proteínas, evita los procesados y consulta siempre con tu veterinario.
        No olvides que cada raza y edad tiene necesidades diferentes.
      ` },
    { title: "Alimentación Felina", summary: "Conoce cómo alimentar correctamente a tu gato en cada etapa de su vida.", content: `
        Los gatos necesitan una dieta rica en taurina, un aminoácido esencial para ellos. También es importante mantener el equilibrio entre comida seca y húmeda.
        Hidratar bien a tu felino es fundamental.
      ` },
    { title: "Cuidados Generales de Mascotas", summary: "Vacunación, higiene y actividades para una vida plena.", content: `
        Mantén las vacunas al día, cepilla regularmente a tu mascota y realiza visitas periódicas al veterinario.
        El ejercicio y el juego son fundamentales para su bienestar mental y físico.
      ` },
    { title: "Ejercicio para Perros", summary: "Ideas de actividades para mantener activo a tu perro.", content: `
        Paseos diarios, juegos de buscar la pelota y circuitos de agility son excelentes para quemar energía.
        Adaptar la intensidad al nivel de vida y edad de tu perro es fundamental.
      ` },
    { title: "Higiene Felina", summary: "Cómo mantener limpio y saludable el pelo de tu gato.", content: `
        Cepillar a tu gato varias veces por semana reduce la formación de bolas de pelo.
        Revisa orejas y uñas regularmente y utiliza productos específicos para felinos.
      ` },
    { title: "Entrenamiento Básico", summary: "Comandos esenciales que todo perro debe aprender.", content: `
        Sentarse, quedarse quieto y venir cuando se le llama son comandos vitales.
        Usa refuerzo positivo y sesiones cortas para mejores resultados.
      ` },
    { title: "Cuidado de Mascotas Senior", summary: "Atención especial para perros y gatos mayores.", content: `
        Ajusta la dieta a menor actividad, proporciona camas ortopédicas y revisa dolores articulares.
        Control médico más frecuente para detección temprana de enfermedades.
      ` },
  ];

  const totalPages = Math.ceil(blogs.length / pageSize);
  const start = page * pageSize;
  const pageBlogs = blogs.slice(start, start + pageSize);

  return (
    <div
      className="container mt-5 mb-5"
      style={{ fontFamily: "Inter, sans-serif", lineHeight: "1.8", textAlign: "center" }}
    >
      <h1
        className="mb-4"
        style={{ fontSize: "2.5rem", fontWeight: "bold", fontFamily: "Madimi One, cursive" }}
      >
        Blog de Mascotas
      </h1>

      <div>
        {pageBlogs.map((blog, index) => {
          const globalIndex = start + index;
          return (
            <div
              key={globalIndex}
              className="mb-4"
              onClick={() => setSelected(selected === globalIndex ? null : globalIndex)}
              style={{
                cursor: "pointer",
                transition: "all 0.3s ease-in-out",
                transform: selected === globalIndex ? "scale(1.02)" : "scale(1)",
              }}
            >
              <div
                className="p-4 rounded"
                style={{
                  backgroundColor: "#f8f9fa",
                  border: selected === globalIndex ? "2px solid #00bfa6" : "1px solid #ccc",
                  boxShadow: selected === globalIndex ? "0 0 15px rgba(0, 191, 166, 0.5)" : "none",
                }}
              >
                <h2 style={{ fontSize: "1.8rem", fontFamily: "Madimi One, cursive" }}>
                  {blog.title}
                </h2>
                <p style={{ textAlign: "center" }}>
                  {selected === globalIndex ? blog.content : blog.summary}
                </p>
                <p style={{ color: "#00bfa6", fontWeight: "bold" }}>
                  {selected === globalIndex ? "Haz clic para contraer" : "Haz clic para leer más"}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="d-flex justify-content-center mt-4">
        <button
          className="btn btn-secondary me-2"
          onClick={() => setPage((p) => Math.max(p - 1, 0))}
          disabled={page === 0}
        >
          Anterior
        </button>
        <button
          className="btn btn-secondary"
          onClick={() => setPage((p) => Math.min(p + 1, totalPages - 1))}
          disabled={page === totalPages - 1}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default Blog;
