import React, { useState } from "react";
import "./App.css";
import StyledBox from "./components/StyledBox";
import ColorForm from "./components/ColorForm";


function App() {
  const [results, setResults] = useState({
    colors: []
  });

  return (
    <div className="App">
      <div className="container"> {/* Bootstrap needs this "container" div to be responsive */}
        <h1 className="display-4 my-3">Box Generator</h1>
        <ColorForm setResults={setResults} results={results}/>
        <div className="row"> {/* Bootstrap needs this "row" div for grid to apply media queries */}
          {results.colors.map((color) => (
            <StyledBox color={color}/>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
