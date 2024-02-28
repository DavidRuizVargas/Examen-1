//pokemon.tsx
import axios from 'axios';
import { useEffect, useState } from 'react';

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
    axios.get('https://pokeapi.co/api/v2/pokemon?offset=0&limit=151')
      .then(response => {
        setPokemons(response.data.results);
      })
      .catch(error => {
        console.error("Error fetching data: ", error);
      });
  }, []);

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

  return (
    <div>
      <h1>Pokédex</h1>
      <div className="pokemon-list">
        {pokemons.map((pokemon) => (
          <div key={pokemon.name} className="Content">
            <button onClick={() => handlePokemonClick(pokemon)}>{pokemon.name}</button>
            {/* Aquí se muestra la imagen de cada Pokémon */}
            <img src={`https://img.pokemondb.net/sprites/omega-ruby-alpha-sapphire/dex/normal/${pokemon.name.toLowerCase()}.png`} alt={pokemon.name} />
          </div>
        ))}
      </div>
      {selectedPokemon && (
        <div className="modal">
          <div className="modal-content">
            <button onClick={handleCloseDetails}>Cerrar</button>
            <h2>{selectedPokemon.id}. {selectedPokemon.name}</h2>
            <img src={`https://img.pokemondb.net/sprites/omega-ruby-alpha-sapphire/dex/normal/${selectedPokemon.name.toLowerCase()}.png`} alt={selectedPokemon.name} />
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





