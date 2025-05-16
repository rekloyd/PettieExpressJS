import React, { useState } from "react";
import "../styles/checkout.css";

const coinOptions = [
  { coins: 1000, price: 10 },
  { coins: 3000, price: 30 },
  { coins: 10000, price: 100 },
];

const Checkout = () => {
  const [selected, setSelected] = useState(coinOptions[0]);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(null);
    setError(null);

    const idUsuarioStr = sessionStorage.getItem("idUsuario");
    if (!idUsuarioStr) {
      setError("No se ha encontrado el ID del usuario.");
      return;
    }
    const idUsuario = parseInt(idUsuarioStr, 10);

    try {
      const response = await fetch(
        `http://localhost:4000/api/usuario/${idUsuario}/pettiecoins`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ cantidad: selected.coins }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Ha ocurrido un error al procesar la solicitud.");
      } else {
        setSuccess(`¡Has recibido ${selected.coins.toLocaleString()} PettieCoins!`);
      }
    } catch (err) {
      setError("No se pudo conectar con el servidor.");
      console.error(err);
    }
  };

  return (
    <div className="checkout-container">
      <div className="checkout-box">
        <h1 style={{ fontFamily: "Madimi One" }}>Comprar PettieCoins</h1>

        <div className="options">
          {coinOptions.map((option) => (
            <button
              key={option.coins}
              className={`option-button ${
                selected.coins === option.coins ? "active" : ""
              }`}
              onClick={() => setSelected(option)}
            >
              {option.coins.toLocaleString()} Coins
            </button>
          ))}
        </div>

        <div className="summary">
          <p>
            <strong>Cantidad:</strong> {selected.coins.toLocaleString()} PettieCoins
          </p>
          <p>
            <strong>Total:</strong> {selected.price.toFixed(2)} €
          </p>
        </div>

        <form className="payment-form" onSubmit={handleSubmit}>
          <label>
            Nombre completo
            <input type="text" placeholder="Juan Pérez" required />
          </label>

          <label>
            Número de tarjeta
            <input type="text" placeholder="1234 5678 9012 3456" required />
          </label>

          <div className="row">
            <label>
              Expiración
              <input type="text" placeholder="MM/AA" required />
            </label>
            <label>
              CVC
              <input type="text" placeholder="123" required />
            </label>
          </div>

          <button type="submit" className="pay-button">
            Pagar {selected.price.toFixed(2)} €
          </button>
        </form>

        {success && <p className="success-message">{success}</p>}
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
};

export default Checkout;
