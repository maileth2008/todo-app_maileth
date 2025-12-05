import { useState, useEffect } from "react";
import PokemonForm from "./componentes/PokemonForm";
import PokemonItem from "./componentes/PokemonItem";
import Filtros from "./Filtros";
import EditarTodo from "./EditarTodo";



export default function Pokemons() {
  const [todos, setTodos] = useState([]);
  const [nuevoTodo, setNuevoTodo] = useState("");
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=20")
      .then((r) => r.json())
      .then((data) => {
        const list = data.results.map((p, i) => ({
          id: i + 1,
          title: p.name,
          completed: false,
        }));
        setTodos(list);
      })
      .catch((err) => {
        console.error(err);
        setError("Error al cargar los pokemons");
      })
      .finally(() => setCargando(false));
  }, []);

  function agregarTodo(e) {
    e.preventDefault();
    if (nuevoTodo.trim() === "") {
      alert("No puedes agregar un TODO vacío");
      return;
    }

    setTodos([
      ...todos,
      { id: Date.now(), title: nuevoTodo, completed: false },
    ]);
    setNuevoTodo("");
  }

  function toggleTodo(id) {
  setTodos(
    todos.map((t) =>
      t.id === id ? { ...t, completed: !t.completed } : t
    )
  );
}

function eliminarTodo(id) {
  setTodos(todos.filter(t => t.id !== id));
}


return (
  <div>
    <h1>PokéTodos</h1>

    {cargando && <p>Cargando Pokemons....</p>}
    {error && <p style={{ color: "red" }}>{error}</p>}

    <PokemonForm
      nuevoTodo={nuevoTodo}
      setNuevoTodo={setNuevoTodo}
      agregarTodo={agregarTodo}
    />

    <ul>
      {todos.map((todo) => (
        <PokemonItem
          key={todo.id}
          todo={todo}
          toggleTodo={toggleTodo}
          eliminarTodo={eliminarTodo}
        />
      ))}
    </ul>
  </div>
);

}