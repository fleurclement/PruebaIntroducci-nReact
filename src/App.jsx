// App.jsx

import React from 'react';
import MiApi from './Components/MiApi'; // Importa el componente MiApi

const App = () => {
  return (
    <div className="container">
      <h1>Consulta de Feriados</h1>
      <MiApi />
    </div>
  );
}

export default App;
