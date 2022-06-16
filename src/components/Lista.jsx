import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";

import CardPokemon from "./CardPokemon";

export default function Lista() {
  const [pokemons, setPokemons] = useState([]);
  const [pagina, setPagina] = useState(0);
  const [limite, setLimite] = useState(6);
  const [numero, setNumero] = useState(1);
  // state donde guardamos el texto ingresado al input por el usuario.
  const [input, setInput] = useState("");

  const [types, setTypes] = useState([]);

  const isAnteriorDisabled = numero === 1;
  const isSiguienteDisabled = pokemons.length === 0;

  const getPokemonData = async (name) => {
    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${name}`
    );
    return response.data;
  };

  const fetchPokemons = async (listaPersonajes) => {
    try {
      const promises = listaPersonajes.map(async (pokemon) => {
        return await getPokemonData(pokemon.name);
      });
      const results = await Promise.all(promises);
      setPokemons(results);
    } catch (error) {}
  };

  // Endpoint limitado pokemon por pagina
  useEffect(() => {
    const request = async () => {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon?limit=${limite}&offset=${pagina}`
      );
      const listaPersonajes = response.data.results;
      fetchPokemons(listaPersonajes);
    };
    request();
  }, [pagina, input]);

  // Endpoint limitado pokemon por pagina
  // useEffect(() => {
  //   const request = async () => {
  //     const response = await axios.get(`https://pokeapi.co/api/v2/pokemon`);
  //     const allData = response.data.results;
  //     console.log("~ allData ", allData);
  //     fetchPokemons(allData);
  //   };
  //   request();
  // }, []);

  // funcion para crear un nuevo array
  // const arraySoloNombres = pokemons.map((pokemon) => pokemon.name);

  // const nuevoTypo = pokemons.flat([1]).map((pokemon) =>
  //   pokemon.types.map((types) => {
  //     return types.type.name;
  //   })
  // );

  const funcion = () => {
    let arrayTypes = [];

    for (let i = 0; i < pokemons.length; i++) {
      const types = pokemons[i].types;

      types.forEach((type) => {
        if (!arrayTypes.includes(type.type.name)) {
          arrayTypes.push(type.type.name);
        }
      });

      // for (let j = 0; j < types.length; j++) {
      //   const typePokemon = types[j].type.name;
      //   arrayRepetidos.push(typePokemon);

      //   if (!arrayTypes.includes(typePokemon)) {
      //     arrayTypes.push(typePokemon);
      //   }
      // }
    }
    setTypes(arrayTypes);
  };

  const pokemonFilter = pokemons.filter((pokemon) =>
    // pokemon.types[0].type.name === "fire" ||
    // pokemon.types[1].type.name === "fire"
    pokemon.types.find(({ type }) => type.name === input)
  );
  console.log("~ pokemonFilter", pokemonFilter);

  // Endpoint filtrado
  useEffect(() => {
    funcion();
  }, [pokemons]);

  // const clickPagina = () => {
  //   setPagina(pagina - 1);
  // };

  // const limit = limite;
  // const inicial = 0 + pagina + limit - limit;
  // const last = inicial + limit;
  // const newsPaginate = pokemons.slice(inicial, last);
  // const mapPokemons = newsPaginate.map((pokemon, id) => (
  //   <CardPokemon pokemon={pokemon} />
  // ));

  // funcion para capturar lo ingresado por el usuario en el input
  const handleChange = (e) => {
    e.preventDefault();
    const { value } = e.target;
    const newInput = value;
    setInput(newInput);
    // setPokemons(pokemonFilter);
  };

  return (
    <div className="container">
      <h1 className="text-center">lista</h1>
      <div className="mt-2 w-75 mx-auto">
        <Form.Select
          aria-label="Default select example"
          onChange={handleChange}
        >
          <option value="">All types</option>
          {types.map((type) => (
            <option value={type}>{type}</option>
          ))}
        </Form.Select>
      </div>
      <div className="d-flex flex-wrap justify-content-center">
        {input === ""
          ? pokemons.map((pokemon, id) => <CardPokemon pokemon={pokemon} />)
          : pokemonFilter.map((pokemon, id) => (
              <CardPokemon pokemon={pokemon} />
            ))}
      </div>
      <div className="d-flex  justify-content-center">
        <Button
          onClick={() => {
            setPagina(pagina - limite);
            setNumero(numero - 1);
          }}
          disabled={isAnteriorDisabled}
        >
          Anterior
        </Button>

        {numero}
        <Button
          onClick={() => {
            setPagina(pagina + limite);
            setNumero(numero + 1);
          }}
          disabled={isSiguienteDisabled}
        >
          Siguiente
        </Button>
      </div>
    </div>
  );
}
