import { useState, useEffect } from "react";

export default function Pokemons(){
  const [todos, setTodos] = useState([]);
  const [nuevoTodo, setNuevoTodo] = useState("");
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);



 useEffect(() => {
  

  fetch("https://pokeapi.co/api/v2/pokemon?limit=20")
    .then(r => r.json())
    .then(data => {
      const list = data.results.map((p,i) => ({
        id: i+1,
        title: p.name,
        completed: false
      }));
      setTodos(list);
    })
   .catch(err => {
  console.error(err);
  setError("Error al cargar los pokemons");   
})

    .finally(() => setCargando(false)); 
    
  
  
}, []);


  function agregarTodo(e){
    e.preventDefault();
    if(nuevoTodo.trim() === "") {
      alert("No puedes agregar un TODO vacío");
      return;
    }
    setTodos([...todos, { id: Date.now(), title: nuevoTodo, completed: false }]);
    setNuevoTodo("");
    console.log("Nuevo TODO (capturado en formulario):", nuevoTodo);
  }
 function toggleTodo(id) {
    setTodos(todos.map(t =>
      t.id === id ? { ...t, completed: !t.completed } : t
    ));
  }
  function eliminarTodo(id) {
  setTodos(todos.filter(t => t.id !== id));
}


  return (
    <div>
      <h1>PokéTodos</h1>

      {cargando && <p>Cargando Pokemons....</p>} 
      {error && <p style={{ color: "red" }}>{error}</p>}


      <form onSubmit={agregarTodo}>
        <input value={nuevoTodo} onChange={e => setNuevoTodo(e.target.value)} placeholder="Nuevo Poké-TODO" />
        <button>Agregar</button>
      </form>

      {todos.map(todo => (
  <li key={todo.id}>
    {todo.title} — {todo.completed ? "si" : "no"}

    <button onClick={() => toggleTodo(todo.id)}>Cambiar estado</button>

     <button onClick={() => eliminarTodo(todo.id)}>Eliminar</button>

  </li>
))}

    </div>
  );
}

