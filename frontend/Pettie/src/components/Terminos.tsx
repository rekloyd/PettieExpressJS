/**
 * Terminos generales de la empresa, ficticios hasta el momento.
 *
 * @author Pau
 * @author Didac Morillas
 * @version 0.5.1
 * @date 2025-05-19
 */

import React from "react";
import { Link } from "react-router-dom";

const Terminos: React.FC = () => {
  return (
    <div className="container mt-5 mb-5" style={{ fontFamily: 'Inter, sans-serif', lineHeight: '1.8' }}>
      <h1 className="mb-4" style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>
        Términos y Condiciones de Uso – Pettie
      </h1>

      <p>
        Bienvenido a <strong>Pettie</strong>, la plataforma que conecta a dueños de perros (<strong>Propietarios</strong>) con cuidadores confiables (<strong>Pettiers</strong>).
        Al acceder o utilizar nuestros servicios, aceptas los siguientes términos y condiciones. Por favor, léelos cuidadosamente.
      </p>

      <h2 className="mt-4" style={{ fontSize: '1.8rem' }}>1. Definiciones</h2>
      <p>
        <strong>Propietario:</strong> Usuario que busca servicios de cuidado para su perro.<br />
        <strong>Pettier:</strong> Usuario que ofrece servicios de cuidado a través de la plataforma.
      </p>

      <h2 className="mt-4" style={{ fontSize: '1.8rem' }}>2. Uso del servicio</h2>
      <p>
        La plataforma Pettie solo debe utilizarse con fines lícitos y para conectar Propietarios con Pettiers. Queda prohibido cualquier uso fraudulento o no autorizado.
      </p>

      <h2 className="mt-4" style={{ fontSize: '1.8rem' }}>3. Responsabilidades del Propietario</h2>
      <ul>
        <li>Proporcionar información veraz sobre el perro (comportamiento, salud, necesidades especiales, etc.).</li>
        <li>Ser puntual en la entrega y recogida del perro según lo acordado con el Pettier.</li>
        <li>Compensar al Pettier por los servicios prestados según lo pactado.</li>
      </ul>

      <h2 className="mt-4" style={{ fontSize: '1.8rem' }}>4. Responsabilidades del Pettier</h2>
      <ul>
        <li>Ofrecer un entorno seguro, limpio y cómodo para el perro.</li>
        <li>Informar al Propietario de cualquier incidente o problema durante el cuidado.</li>
        <li>No delegar el cuidado del perro a terceros no registrados en la plataforma.</li>
      </ul>

      <h2 className="mt-4" style={{ fontSize: '1.8rem' }}>5. Seguridad y confianza</h2>
      <p>
        Pettie promueve una comunidad basada en la confianza. Cualquier conducta inapropiada puede resultar en la suspensión o eliminación de la cuenta.
      </p>

      <h2 className="mt-4" style={{ fontSize: '1.8rem' }}>6. Modificaciones</h2>
      <p>
        Pettie se reserva el derecho de modificar estos términos en cualquier momento. Se recomienda revisarlos periódicamente.
      </p>

      <h2 className="mt-4" style={{ fontSize: '1.8rem' }}>7. Contacto</h2>
      <p>
        Para dudas o más información, puedes visitar nuestra página de <Link to="/contacto">Contacto</Link> o escribirnos directamente.
      </p>
    </div>
  );
};

export default Terminos;
