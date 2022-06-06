import axios from "axios";
import { useEffect, useState } from "react";
import CardPokemon from "./CardPokemon";

export default function Lista() {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    const request = async () => {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon?limit=248&offset=0`
      );
      const listaPersonajes = response.data.results;

      setPokemons(listaPersonajes);
    };
    request();
  }, []);

  return (
    <div className="container">
      <h1 className="text-center">lista</h1>
      <div className="d-flex flex-wrap justify-content-center">
        {pokemons.map((pokemon, id) => (
          <div key={id}>
            <CardPokemon pokemon={pokemon} />
          </div>
        ))}
      </div>
    </div>
  );
}
