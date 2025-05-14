import { useEffect } from "react";

const Servicio = () => {
  useEffect(() => {
    const link = document.createElement("link");
    link.href =
      "https://fonts.googleapis.com/css2?family=Inter:wght@400;500&family=Madimi+One&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }, []);

  return (
    <div
      style={{
        fontFamily: "Inter, sans-serif",
        maxWidth: "900px",
        margin: "auto",
        padding: "2rem 1rem",
        fontSize: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "2rem",
        marginTop: "80px",
      }}
    >
      <h2
        style={{
          fontFamily: "Madimi One, cursive",
          fontSize: "45px",
          fontWeight: 400,
          marginBottom: "2rem",
          textAlign: "center",
        }}
      >
        Servicios de Pettie
      </h2>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "2rem",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <div
          style={{
            flex: "1 1 350px",
            border: "1px solid #ccc",
            borderRadius: "15px",
            padding: "2rem",
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
            backgroundColor: "#fff",
          }}
        >
          <h3
            style={{
              fontFamily: "Madimi One, cursive",
              fontSize: "32px",
              marginBottom: "1rem",
              textAlign: "center",
            }}
          >
            Pettier 🐕 🦺
          </h3>
          <p style={{ lineHeight: "1.6", textAlign: "justify" }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
            placerat, velit in sodales facilisis, ligula nisl malesuada lorem,
            et porttitor elit risus eget justo.
          </p>
        </div>

        <div
          style={{
            flex: "1 1 350px",
            border: "1px solid #ccc",
            borderRadius: "15px",
            padding: "2rem",
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
            backgroundColor: "#fff",
          }}
        >
          <h3
            style={{
              fontFamily: "Madimi One, cursive",
              fontSize: "32px",
              marginBottom: "1rem",
              textAlign: "center",
            }}
          >
            Propietario 😼 🏠
          </h3>
          <p style={{ lineHeight: "1.6", textAlign: "justify" }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
            at ligula sodales, blandit mi nec, bibendum lorem. Nullam ac magna
            non sapien imperdiet accumsan.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Servicio;