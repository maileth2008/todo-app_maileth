// src/componentes/PokemonForm.jsx
export default function PokemonForm({ nuevoTodo, setNuevoTodo, agregarTodo }) {
  return (
    <form onSubmit={agregarTodo}>
      <input 
        value={nuevoTodo} 
        onChange={e => setNuevoTodo(e.target.value)} 
        placeholder="Nuevo Poké-TODO" 
      />
      <button>Agregar</button>
    </form>
  );
}
