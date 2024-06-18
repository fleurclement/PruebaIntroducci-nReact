// MiApi.jsx
import React, { useState, useEffect } from 'react';
import Buscador from './Buscador';

const MiApi = () => {
  const [feriados, setFeriados] = useState([]);
  const [feriadosFiltrados, setFeriadosFiltrados] = useState([]);
  const [mes, setMes] = useState('');
   const [terminoBusqueda, setTerminoBusqueda] = useState('');

  useEffect(() => {
    const fetchFeriados = async () => {
      try {
        const response = await fetch('https://api.boostr.cl/feriados/en.json');
        if (!response.ok) {
          throw new Error('Error al cargar los datos');
        }
        const data = await response.json();
        console.log('Datos de la API:', data); // Verifica la estructura de los datos
        // Filtra los feriados del año 2024
        const feriados2024 = data.data.filter(feriado => feriado.date.startsWith('2024'));
        setFeriados(feriados2024);
      } catch (error) {
        console.error('Error al obtener los feriados:', error);
      }
    };

    fetchFeriados();
  }, []);

   // Función para manejar el cambio de mes seleccionado
  const handleChangeMes = (e) => {
    setMes(e.target.value);
    setOrdenado(false); // Al cambiar el mes, resetear el estado de ordenado
  };

  // Función para filtrar los feriados por mes seleccionado
  const filtrarPorMes = () => {
    if (mes) {
      const resultados = feriados.filter(feriado => new Date(feriado.date).getMonth() + 1 === parseInt(mes));
      setFeriadosFiltrados(resultados);
    } else {
      setFeriadosFiltrados([]);
    }
  };

  const filtrarPorTermino = () => {
    if (terminoBusqueda) {
      const resultados = feriados.filter(feriado => feriado.title.toLowerCase().includes(terminoBusqueda.toLowerCase()));
      setFeriadosFiltrados(resultados);
    } else {
      setFeriadosFiltrados([]);
    }
  };

     // Función para ordenar los feriados alfabeticamente
  const ordenarAlfabeticamente = () => {
    const copiaFeriados = [...feriadosFiltrados];
    copiaFeriados.sort((a, b) => a.title.localeCompare(b.title));
    setFeriadosFiltrados(copiaFeriados);
  };

  return (
    <div>
      <label htmlFor="mes">Seleccione el mes:</label>
      <select id="mes" value={mes} onChange={handleChangeMes}>
        <option value="">Seleccione...</option>
        <option value="1">Enero</option>
        <option value="2">Febrero</option>
        <option value="3">Marzo</option>
        <option value="4">Abril</option>
        <option value="5">Mayo</option>
        <option value="6">Junio</option>
        <option value="7">Julio</option>
        <option value="8">Agosto</option>
        <option value="9">Septiembre</option>
        <option value="10">Octubre</option>
        <option value="11">Noviembre</option>
        <option value="12">Diciembre</option>
      </select>

      <button onClick={filtrarPorMes}>Buscar feriados</button>

      <Buscador
        terminoBusqueda={terminoBusqueda}
        setTerminoBusqueda={setTerminoBusqueda}
        filtrarPorTermino={filtrarPorTermino}
      />

      {feriadosFiltrados.length > 0 && (
        <div>
          <h3>Feriados:</h3>
          <ul>
            {feriadosFiltrados.map(feriado => (
              <li key={feriado.date}>{feriado.title} - {feriado.date}</li>
            ))}
          </ul>

  

          <button onClick={ordenarAlfabeticamente}>Ordenar alfabéticamente</button>
        </div>
      )}
    </div>
  );
};

export default MiApi;
