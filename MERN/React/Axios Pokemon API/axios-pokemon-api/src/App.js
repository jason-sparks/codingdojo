import React, { useState } from 'react';
import './App.css';
import Pokemon from './components/Pokemon';


function App() {
  const [results, setResults] = useState([]);

  const liftState = (param) => {
    setResults(param);
  }

  return (
    <div className="App">
      <div className="container">
        <Pokemon liftState={liftState}/>
        <div className="row mx-auto">
          {/* {console.log(results.length)}
          {results.map( (item, i) => console.log( i, item.name) )} */}
        <ul className="list-group list-group-flush  mx-auto">{
            results.map( (item, i) => 
                <li key={ i } className="list-group-item">{ item.name }</li>
            )
        }</ul>
        </div>
      </div>
    </div>
  );
}

export default App;