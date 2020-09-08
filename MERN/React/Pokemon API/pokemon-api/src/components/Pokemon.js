import React, { useState, useEffect } from 'react';

function Pokemon(props) {
    const [pokemon, setPokemon] = useState([]);

    useEffect(() => {
        fetch("https://pokeapi.co/api/v2/pokemon?limit=1100")
            .then(response => response.json())
            .then(response => setPokemon(response.results))
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(pokemon);   
        props.liftState(pokemon);
    }

    return (
        <form onSubmit={handleSubmit}>
            <button className="btn btn-secondary my-4">Fetch Pokemon</button>
        </form>
    );
}

export default Pokemon;