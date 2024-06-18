// Buscador.jsx
import React from 'react';

const Buscador = ({ terminoBusqueda, setTerminoBusqueda, filtrarPorTermino }) => {
  const handleChange = (e) => {
    setTerminoBusqueda(e.target.value);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Buscar feriado por nombre..."
        value={terminoBusqueda}
        onChange={handleChange}
      />
      <button onClick={filtrarPorTermino}>Buscar</button>
    </div>
  );
};

export default Buscador;
