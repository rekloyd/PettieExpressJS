import React, { useState } from "react";
import "../styles/checkout.css";

const coinOptions = [
  { coins: 1000, price: 10 },
  { coins: 3000, price: 30 },
  { coins: 10000, price: 100 },
];

const Checkout = () => {
  const [selected, setSelected] = useState(coinOptions[0]);

  return (
    <div className="checkout-container">
      <div className="checkout-box">
        <h1 style={{fontFamily:'Madimi One'}}>Comprar PettieCoins</h1>

        <div className="options">
          {coinOptions.map((option) => (
            <button
              key={option.coins}
              className={`option-button ${selected.coins === option.coins ? "active" : ""}`}
              onClick={() => setSelected(option)}
            >
              {option.coins.toLocaleString()} Coins
            </button>
          ))}
        </div>

        <div className="summary">
          <p><strong>Cantidad:</strong> {selected.coins.toLocaleString()} PettieCoins</p>
          <p><strong>Total:</strong> {selected.price.toFixed(2)} €</p>
        </div>

        <form className="payment-form">
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
      </div>
    </div>
  );
};

export default Checkout;
