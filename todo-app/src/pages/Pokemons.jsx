import { useEffect } from "react";

export default function Pokemons(){
  useEffect(() => {
    console.log("Ejecutando fetch de PokéAPI...");
    fetch("https://pokeapi.co/api/v2/pokemon?limit=20")
      .then(r => r.json())
      .then(data => console.log("Datos recibidos:", data))
      .catch(e => console.error(e));
  }, []);

  return (
    <div>
      <h1>PokéTodos</h1>
      <p>Consulta inicial realizada</p>
    </div>
  );
}

