// src/componentes/PokemonItem.jsx
export default function PokemonItem({ todo, toggleTodo, eliminarTodo }) {
  return (
    <li>
      {todo.title} — {todo.completed ? "completado" : "pendiente"}

      <button onClick={() => toggleTodo(todo.id)}>
        Cambiar estado
      </button>

      <button onClick={() => eliminarTodo(todo.id)}>
        Eliminar
      </button>
    </li>
  );
}
