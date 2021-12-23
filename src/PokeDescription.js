import React, { useState } from "react"



function PokeDescription(props) {
  const [moveIndex, setMoveIndex] = useState(0);

  if (props.pokemonState.abilities && props.pokeSpecies && props.pokeLocations) {
    function topPokeLocations(locationsArray){
      let pokeLocations = []
      for(let i = 0; i < 5; i++){
        if(locationsArray[i]){
          pokeLocations.push(locationsArray[i].location_area.name)
        }
      }
      return pokeLocations
    }
    let pokeLocations = topPokeLocations(props.pokeLocations)
    let gender = genderFate(props.pokeSpecies.gender_rate)

    let genderPics = [ "", "data:image/png;base64,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", "", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXjEPbZrftuKIaQqNEsQ8nV43RXk7e6FfQQNHihlJhOOQYhjpzuLcR6bVMoNk4l01ysqA&usqp=CAU"]
    const typePics={
      bug: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Pok%C3%A9mon_Bug_Type_Icon.svg/240px-Pok%C3%A9mon_Bug_Type_Icon.svg.png",
      dark: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Pok%C3%A9mon_Dark_Type_Icon.svg/240px-Pok%C3%A9mon_Dark_Type_Icon.svg.png",
      dragon: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Pok%C3%A9mon_Dragon_Type_Icon.svg/240px-Pok%C3%A9mon_Dragon_Type_Icon.svg.png",
      electric: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Pok%C3%A9mon_Electric_Type_Icon.svg/240px-Pok%C3%A9mon_Electric_Type_Icon.svg.png",
      fairy: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Pok%C3%A9mon_Fairy_Type_Icon.svg/240px-Pok%C3%A9mon_Fairy_Type_Icon.svg.png",
      fighting: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Pok%C3%A9mon_Fighting_Type_Icon.svg/240px-Pok%C3%A9mon_Fighting_Type_Icon.svg.png",
      fire: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Pok%C3%A9mon_Fire_Type_Icon.svg/240px-Pok%C3%A9mon_Fire_Type_Icon.svg.png",
      flying: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Pok%C3%A9mon_Flying_Type_Icon.svg/240px-Pok%C3%A9mon_Flying_Type_Icon.svg.png",
      ghost: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Pok%C3%A9mon_Ghost_Type_Icon.svg/240px-Pok%C3%A9mon_Ghost_Type_Icon.svg.png",
      grass: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Pok%C3%A9mon_Grass_Type_Icon.svg/240px-Pok%C3%A9mon_Grass_Type_Icon.svg.png",
      ground: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Pok%C3%A9mon_Ground_Type_Icon.svg/240px-Pok%C3%A9mon_Ground_Type_Icon.svg.png",
      ice: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Pok%C3%A9mon_Ice_Type_Icon.svg/240px-Pok%C3%A9mon_Ice_Type_Icon.svg.png",
      normal: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Pok%C3%A9mon_Normal_Type_Icon.svg/240px-Pok%C3%A9mon_Normal_Type_Icon.svg.png",
      poison: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Pok%C3%A9mon_Poison_Type_Icon.svg/240px-Pok%C3%A9mon_Poison_Type_Icon.svg.png",
      psychic: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Pok%C3%A9mon_Psychic_Type_Icon.svg/240px-Pok%C3%A9mon_Psychic_Type_Icon.svg.png",
      rock: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Pok%C3%A9mon_Rock_Type_Icon.svg/240px-Pok%C3%A9mon_Rock_Type_Icon.svg.png",
      steel: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Pok%C3%A9mon_Steel_Type_Icon.svg/240px-Pok%C3%A9mon_Steel_Type_Icon.svg.png",
      water: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Pok%C3%A9mon_Water_Type_Icon.svg/240px-Pok%C3%A9mon_Water_Type_Icon.svg.png"
    }
    function genderFate(genderNumber){
      if(genderNumber === 8){
        return 3
      } else if (genderNumber === 0){
        return 1
      } else if (0 < genderNumber && genderNumber < 8){
        return 2
      } else if (genderNumber === -1){
        return 0
      }
    }
    function moveIndexChange(event){
      if(event.target.name === "buttonDown" && moveIndex < (Object.keys(props.pokemonState.moves).length)-1){
        if(moveIndex < (Object.keys(props.pokemonState.moves).length)-4){
        setMoveIndex(moveIndex + 1)
        }
      }
      if(event.target.name === "buttonUp" && moveIndex > 0){
        setMoveIndex(moveIndex - 1)
      }
    }
    return (
      <div>
            {/* <h1 style={{"margin":"10px"}}>{props.pokemonState.name[0].toUpperCase() + props.pokemonState.name.slice(1, props.pokemonState.name.length)}</h1> */}
            <div>
        <img style={{height: "150px", width: "150px"}} src={props.pokemonState.sprites.front_default}></img>
        <img style={{height: "150px", width: "150px"}} src={props.pokemonState.sprites.back_default}></img>
            </div>
    <div className="type">{props.pokemonState.types.map((type, i)=><img className="type-pics" key={type.type.name} src={typePics[type.type.name]} />)}</div>
        <div className="pokemon-description">
          <div className="pokemon-attribute">
            <h3>Abilities:</h3>
            {props.pokemonState.abilities.map(ability => (
              <p key={ability.slot}>{ability.ability.name.split("-").map(word=>word[0].toUpperCase() + word.slice(1, word.length)).join(" ")}</p>
            ))}
          </div>
          <div className="pokemon-attribute">
          <p><b>Color:</b></p><div className="block-color" style={{backgroundColor: props.pokeSpecies.color.name}}></div>
            <p>{props.pokeSpecies.color.name[0].toUpperCase() + props.pokeSpecies.color.name.slice(1, props.pokeSpecies.color.name.length)}</p>
          </div>
          <div className="pokemon-attribute">
            <b>Gender:</b>{gender ? (gender === 2 ? <div className="gender-flex"><img className="gender-icon" src={genderPics[1]} /> <img className="gender-icon" src={genderPics[3]} /></div> : <img className="gender-icon" src={genderPics[gender]} /> ): <p>Genderless</p>}
          </div>
          <div className="pokemon-attribute">
          <b>Locations:</b> {pokeLocations.length ? <div>{pokeLocations.map((loco, i)=><p key={i}>{loco.split("-").join(" ")}</p>)}</div> : <p>Cannot be found in Game</p>}
          </div>
            {props.pokemonState.moves.length > 4 ? <div className="moves-flex"><b style={{marginBottom:"10px"}}>Moves:</b><button onClick={moveIndexChange} name="buttonUp" className="button-moves"></button>{props.pokemonState.moves.slice(moveIndex, (moveIndex + 4)).map((move, i)=><p key={i} className="p-moves">{move.move.name.split("-").map(word=>word[0].toUpperCase() + word.slice(1, word.length)).join(" ")}</p>)}<button name="buttonDown" onClick={moveIndexChange} className="button-moves"></button></div> : <div className="moves-flex"><b style={{marginBottom:"10px"}}>Moves:</b>{props.pokemonState.moves.slice(moveIndex, (moveIndex + 4)).map((move, i)=><p key={i} className="p-moves">{move.move.name.split("-").map(word=>word[0].toUpperCase() + word.slice(1, word.length)).join(" ")}</p>)}</div>}
        </div>
      </div>
    );
  } else {
    return (
      <div style={{paddingTop:"100px", paddingBottom:"400px"}}>
        <h1>{props.pokemonState.name}</h1>
      </div>
    )
  }
}

export default PokeDescription
