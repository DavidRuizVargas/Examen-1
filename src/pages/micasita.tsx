import React, { useState } from 'react';

type Pregunta = {
  enunciado: string;
  respuestaCorrecta: string;
  respuestaUsuario: string;
  esCorrecta?: boolean;
};

const preguntasIniciales: Pregunta[] = [
  { enunciado: 'Lugar de la casa donde se preparan los alimentos', respuestaCorrecta: 'cocina', respuestaUsuario: '' },
  { enunciado: '¿En que objeto físico se duerme?', respuestaCorrecta: 'cama', respuestaUsuario: '' },
  { enunciado: 'Lugar de la casa para hacer las necesidades del cuerpo humano', respuestaCorrecta: 'baño', respuestaUsuario: '' },
  { enunciado: '¿Dónde se guardan los coches?', respuestaCorrecta: 'cochera', respuestaUsuario: '' },
];


const MiCasita = () => {
  const [preguntas, setPreguntas] = useState<Pregunta[]>(preguntasIniciales);
  const [mostrarRespuestas, setMostrarRespuestas] = useState(false);

  const manejarRespuestaUsuario = (indice: number, respuesta: string) => {
    const nuevasPreguntas = [...preguntas];
    nuevasPreguntas[indice].respuestaUsuario = respuesta;
    setPreguntas(nuevasPreguntas);
  };

  const comprobarRespuestas = () => {
    const preguntasActualizadas = preguntas.map(pregunta => ({
      ...pregunta,
      esCorrecta: pregunta.respuestaUsuario.trim().toLowerCase() === pregunta.respuestaCorrecta.toLowerCase(),
    }));
    setPreguntas(preguntasActualizadas);
    setMostrarRespuestas(true);
  };

  const reiniciarCampos = () => {
    setPreguntas(preguntas.map(pregunta => ({ ...pregunta, respuestaUsuario: '', esCorrecta: undefined })));
    setMostrarRespuestas(false);
  };

  return (
    <div className="container">
      <h1>Tema: Mi Casa</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Pregunta</th>
            <th>Tu Respuesta</th>
            <th>Resultado</th>
            {mostrarRespuestas && <th>Respuesta Correcta</th>}
          </tr>
        </thead>
        <tbody>
          {preguntas.map((pregunta, indice) => (
            <tr key={indice}>
              <td>{pregunta.enunciado}</td>
              <td>
                <input
                  type="text"
                  className="form-control"
                  value={pregunta.respuestaUsuario}
                  onChange={(e) => manejarRespuestaUsuario(indice, e.target.value)}
                />
              </td>
              <td>
                {pregunta.esCorrecta !== undefined && (
                  <span style={{ color: pregunta.esCorrecta ? 'green' : 'red' }}>
                    {pregunta.esCorrecta ? 'Correcto' : 'Incorrecto'}
                  </span>
                )}
              </td>
              {mostrarRespuestas && (
                <td>
                  {pregunta.respuestaCorrecta}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      <button className="btn btn-primary" onClick={comprobarRespuestas}>
        Comprobar Respuestas
      </button>
      {' '}
      <button className="btn btn-secondary" onClick={reiniciarCampos}>
        Reiniciar
      </button>
    </div>
  );
};

export default MiCasita;