import "./App.css";
import React, { useEffect, useState } from "react";
import PokeDescription from "./PokeDescription.js"

function App() {
  /////////////////////////////////////////////
  //STATES
  const [pokemon, setPokemon] = useState("");
  const [pokemonState, setPokemonState] = useState(true);
  const [pokeHistory, setPokeHistory] = useState({});
  const [pokeHistoryIndex, setPokeHistoryIndex] = useState(0)
  const [pokeEvolution, setPokeEvolution] = useState(false)
  const [pokeSpecies, setPokeSpecies] = useState(false)
  const [pokeLocations, setPokeLocations] = useState()
  const [loading, setLoading] = useState(false)

  //
  ///////////////////////////////////////////////
  //GET REQUEST
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
        if (response.status === 404){
          setLoading(false)
          setPokemonState({ name: "Pokemon Not Found" });
        }
        const pokemonInfo = await response.json();
        if (pokemonInfo.id) {
          setPokemonState(pokemonInfo);
          const responseLocations = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}/encounters`);
          const pokemonLocations = await responseLocations.json();
          const responseSpecies = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonInfo.id}/`);
          const pokemonSpeciesInfo = await responseSpecies.json();
          setPokeSpecies(pokemonSpeciesInfo)
          if (pokemonSpeciesInfo.id) {
            setLoading(false)
            const responseEvolution = await fetch(pokemonSpeciesInfo.evolution_chain.url);
            const pokemonEvolutionInfo = await responseEvolution.json();
            setPokeEvolution(pokemonEvolutionInfo)
          }
          if (responseLocations && responseLocations) {
            setPokeLocations(pokemonLocations)
          }
          if (!pokeHistory[pokemonInfo.name]) {
            setPokeHistory({ ...pokeHistory, [pokemonInfo.name]: pokemonInfo });
            if(Object.values(pokeHistory).length > 8){
              setPokeHistoryIndex(Object.values(pokeHistory).length-8)
            }
          }
        }
      } catch (error) {
        // setLoading(false)
        // setPokemonState({ name: "Pokemon Not Found" });
        console.error("error", error);
      }
    };
    fetchData();
  }, [pokemon]);

  /////////////////////////////////////////
  //FORM HANDLER
  const handleSubmit = (event) => {
    event.preventDefault();
    if (event.target.pokemon.value.toLowerCase() !== pokemon) {
      setLoading(true)
      setPokeEvolution(false)
      setPokeSpecies(false)
      setPokemon(event.target.pokemon.value.toLowerCase());
    }
  }

  /////////////////////////////////////////////
  //BUTTON HANDLER
  const handleClick = (event) => {
    event.preventDefault();
    if(event.target.className === "evo-button" && event.target.innerHTML.toLowerCase() !== pokemon) {
      setPokemon(event.target.innerHTML.toLowerCase());
      setPokeEvolution(false)
      setLoading(true)
      setPokeSpecies(false)
    } else if (event.target.className === "one-poke-history-image" && event.target.name.toLowerCase() !== pokemon.toLowerCase()){
      setPokeEvolution(false)
      setLoading(true)
      setPokeSpecies(false)
      setPokemon(event.target.name.toLowerCase());
    }
  };
  function historyIndexChange(event){
    if(event.target.name === "buttonDown" && pokeHistoryIndex < (Object.keys(pokeHistory).length)-1){
      if(pokeHistoryIndex < Object.keys(pokeHistory).length-9){
        setPokeHistoryIndex(pokeHistoryIndex + 1)
      }
    }
      if(event.target.name === "buttonUp" && pokeHistoryIndex > 0){
        setPokeHistoryIndex(pokeHistoryIndex - 1)
    }
  }

  ////////////////////////////////////////
  //RENDER RETURN
  return (
    <div className="main">
      <div className="padding">
        {
          Object.keys(pokeHistory).length > 1 ? (
            <div>
              <h3>
              History:
              </h3>
            <div className="history">
              {Object.values(pokeHistory).length >= 10 ? <button onClick={historyIndexChange} name="buttonUp"></button> : null}
              {Object.values(pokeHistory).slice(pokeHistoryIndex, pokeHistoryIndex + 9).map((onePoke, i) => (
                <div style={onePoke.name === pokemonState.name ? {borderStyle: "solid", borderColor: "red"} : null} key={i}>
                <img src={onePoke.sprites.front_default} name={onePoke.name} className="one-poke-history-image" onClick={handleClick}/>
                </div>
              ))}
              {Object.values(pokeHistory).length >= 10 ? <button onClick={historyIndexChange} name="buttonDown" style={{width:"9px",height:"auto"}}></button> : null}
            </div>
            </div>
          ) : null
        }
        <h1 className="pokemon-font">Search for a pokemon!</h1>
        <form value="pokeSearch" onSubmit={handleSubmit}>
          <label>
          <input type="text" name="pokemon" />
          </label>
          <input type="submit" value="Submit" />
        </form>
        <div className="pokemon-card">
          {(pokeEvolution && pokeEvolution.chain && pokeEvolution.chain.evolves_to[0]) ?
            (pokeEvolution.chain.evolves_to[0].evolves_to[0] ?
              <div className="evolutions">
                <h3 style={pokeEvolution.chain.species.name === pokemonState.name ? {color:"red"} : null} className="evo-button" name={pokeEvolution.chain.species.name} value="pokeEvo" onClick={handleClick}>{pokeEvolution.chain.species.name}</h3>
                <h3 style={pokeEvolution.chain.evolves_to[0].species.name === pokemonState.name ? {color:"red"} : null} className="evo-button" name={pokeEvolution.chain.evolves_to[0].species.name} value="pokeEvo" onClick={handleClick}>{pokeEvolution.chain.evolves_to[0].species.name}</h3>
                <h3 style={pokeEvolution.chain.evolves_to[0].evolves_to[0].species.name === pokemonState.name ? {color:"red"} : null} className="evo-button" name={pokeEvolution.chain.evolves_to[0].evolves_to[0].species.name} value="pokeEvo" onClick={handleClick}>{pokeEvolution.chain.evolves_to[0].evolves_to[0].species.name}</h3>
              </div>
              :
              <div className="evolutions">
                <h3 style={pokeEvolution.chain.species.name === pokemonState.name ? {color:"red"} : null} className="evo-button" name={pokeEvolution.chain.species.name} value="pokeEvo" onClick={handleClick}>{pokeEvolution.chain.species.name}</h3>
                <h3 style={pokeEvolution.chain.evolves_to[0].species.name === pokemonState.name ? {color:"red"} : null} className="evo-button" name={pokeEvolution.chain.evolves_to[0].species.name} value="pokeEvo" onClick={handleClick}>{pokeEvolution.chain.evolves_to[0].species.name}</h3>
              </div>
            )
            :
            null}
          {loading ?
            <img style={{paddingTop:"40px", paddingBottom:"400px"}} className="pokemon-loader" src={require("./pokemongo.gif")}></img>
            :
            <PokeDescription pokemonState={pokemonState} pokeSpecies={pokeSpecies} pokeLocations={pokeLocations} />
          }
        </div>
      </div>
    </div>
  );
}

export default App;
