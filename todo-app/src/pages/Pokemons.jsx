import { useState, useEffect } from "react";

export default function Pokemons(){
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=20")
      .then(r => r.json())
      .then(data => {
        const list = data.results.map((p, i) => ({
          id: i + 1,
          title: p.name,
          completed: false
        }));
        setTodos(list);
      })
      .catch(e => console.error(e));
  }, []);

  return (
    <div>
      <h1>PokéTodos</h1>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            {todo.title} — {todo.completed ? "si" : "no"}
          </li>
        ))}
      </ul>
    </div>
  );
}
