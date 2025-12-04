import { useState, useEffect } from "react";

export default function Pokemons() {
  const [todos, setTodos] = useState([]);
  const [nuevoTodo, setNuevoTodo] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Cargar datos desde PokéAPI
  useEffect(() => {
    async function cargar() {
      try {
        setLoading(true);
        setError("");

        const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=20");

        if (!res.ok) throw new Error("Error al obtener datos de Pokémon");

        const data = await res.json();

        const lista = data.results.map((p, i) => ({
          id: i + 1,
          title: p.name,
          completed: false
        }));

        setTodos(lista);

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    cargar();
  }, []);

  // Agregar nuevo Todo
  function agregarTodo(e) {
    e.preventDefault();

    if (nuevoTodo.trim() === "") {
      alert("No puedes agregar un TODO vacío");
      return;
    }

    setTodos([
      ...todos,
      { id: Date.now(), title: nuevoTodo, completed: false }
    ]);

    setNuevoTodo("");
  }

  // Cambiar estado completado/pendiente
  function toggleTodo(id) {
    setTodos(
      todos.map(todo =>
        todo.id === id
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    );
  }

  // Eliminar todo
  function eliminar(id) {
    setTodos(todos.filter(todo => todo.id !== id));
  }

  // Estados de carga y error
  if (loading) return <p>Cargando Pokémon...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <h1>PokéTodos</h1>

      {/* Formulario */}
      <form onSubmit={agregarTodo}>
        <input
          type="text"
          value={nuevoTodo}
          onChange={(e) => setNuevoTodo(e.target.value)}
          placeholder="Nuevo Poké-TODO"
        />
        <button>Agregar</button>
      </form>

      {/* Listado */}
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            {todo.title} — {todo.completed ? "✔️" : "❌"}

            <button onClick={() => toggleTodo(todo.id)}>
              Cambiar estado
            </button>

            <button onClick={() => eliminar(todo.id)}>
              Eliminar
            </button>
          </li>
        ))}
      </ul>

      {/* Reto (placeholders) */}
      <h3>Funciones próximas</h3>
      <button disabled>Editar (pronto)</button>
      <button disabled>Filtrar completados</button>
      <button disabled>Filtrar pendientes</button>
    </div>
  );
}

