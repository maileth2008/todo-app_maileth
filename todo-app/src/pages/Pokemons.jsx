import { useState, useEffect } from 'react'

export default function Pokemons(){
  const [pokemons, setPokemons] = useState([])

  useEffect(()=> {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=20')
      .then(r => r.json())
      .then(data => setPokemons(data.results))
      .catch(e => console.error(e))
  }, [])

    return (
    <div>
      <h1>Lista de Pokémons</h1>
      <ul>
        {pokemons.map((p, i) => (
          <li key={p.name}>{p.name}</li>
        ))}
      </ul>
    </div>
  )

}
