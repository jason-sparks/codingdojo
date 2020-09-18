import React, { useState } from 'react';
import './App.css';
import Tabs from './components/Tabs';


function App() {
  const [results, setResults] = useState("");

  const items = [
    {
      heading: "Tab 1",
      content: "Tab 1 content is showing here.",
    },
    {
      heading: "Tab 2",
      content: "Tab 2 content is showing here."
    },
    {
      heading: "Tab 3",
      content: "Tab 3 content is showing here."
    }
  ];

  // Lift state from Tabs.js using a function as a prop
  const updateDisplayedTabContent = (tabContent) => {
    setResults(tabContent);
  };

  return (
    <div className="App">
      <div className="container">
        <Tabs items={items} updateDisplayedTabContent={updateDisplayedTabContent}/>
        <div className="row mt-5">
          {results}
        </div>
      </div>
    </div>
  );
}

export default App;
