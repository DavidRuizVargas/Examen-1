import axios from 'axios';
import { useEffect, useState } from 'react';
import GenerationComboBox from './GenerationComboBox'; 

interface Generation {
  name: string;
  offset: number;
  limit: number;
}

interface Pokemon {
  name: string;
  url: string;
}

interface PokemonDetails {
  id: number;
  name: string;
  height: number;
  weight: number;
  types: { type: { name: string } }[];
  moves: { move: { name: string } }[];
}

const Home = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [selectedPokemon, setSelectedPokemon] = useState<PokemonDetails | null>(null);

  useEffect(() => {
    fetchPokemons(0, 151);
  }, []);

  const fetchPokemons = async (offset: number, limit: number) => {
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`);
      setPokemons(response.data.results);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const handleSelectGeneration = (offset: number, limit: number) => {
    fetchPokemons(offset, limit); 
  };

  const handlePokemonClick = async (pokemon: Pokemon) => {
    try {
      const response = await axios.get<PokemonDetails>(pokemon.url);
      setSelectedPokemon(response.data);
    } catch (error) {
      console.error("Error fetching Pokémon details: ", error);
    }
  };

  const handleCloseDetails = () => {
    setSelectedPokemon(null);
  };

  const getPokemonImage = (name: string) => {
    return `https://img.pokemondb.net/sprites/omega-ruby-alpha-sapphire/dex/normal/${name.toLowerCase()}.png`;
  };

  const generations: Generation[] = [
    { name: 'Primera', offset: 0, limit: 151 },
    { name: 'Segunda', offset: 151, limit: 100 },
    { name: 'Tercera', offset: 251, limit: 135 },
    { name: 'Cuarta', offset: 386, limit: 107 },
    { name: 'Quinta', offset: 493, limit: 156 }
  ];

  return (
    <div>
      <h1>Pokédex</h1>
      <div>
        <GenerationComboBox generations={generations} onSelectGeneration={handleSelectGeneration} />
      </div>
      <div className="pokemon-list-container">
        {pokemons.map((pokemon) => (
          <div key={pokemon.name} className="pokemon-card" onClick={() => handlePokemonClick(pokemon)}>
            <button>{pokemon.name}</button>
            <img src={getPokemonImage(pokemon.name)} alt={pokemon.name} />
          </div>
        ))}
      </div>
      {selectedPokemon && (
        <div className="modal">
          <div className="modal-content">
            <button onClick={handleCloseDetails}>Cerrar</button>
            <h2>{selectedPokemon.id}. {selectedPokemon.name}</h2>
            <img src={getPokemonImage(selectedPokemon.name)} alt={selectedPokemon.name} />
            <p>Altura: {selectedPokemon.height}</p>
            <p>Peso: {selectedPokemon.weight}</p>
            <p>Tipos: {selectedPokemon.types.map(type => type.type.name).join(', ')}</p>
            <p>Movimientos: {selectedPokemon.moves.map(move => move.move.name).join(', ')}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
