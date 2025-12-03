import { useState, useEffect } from "react";

export default function Todos() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    console.log("Ejecutando fetch de todos...");

    fetch("https://jsonplaceholder.typicode.com/todos")
      .then(res => res.json())
      .then(data => {
        console.log("Datos recibidos:", data);
        setTodos(data);
      })
      .catch(error => console.error("Error al obtener todos:", error));
  }, []);

  return (
    <div>
      <h1>Página Todos</h1>
      <p>Consultando datos desde API…</p>
    </div>
  );
}

