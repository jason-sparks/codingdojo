import React from 'react';
import './App.css';
import { Router } from '@reach/router';
import Routes from './components/Routes';


function App() {
  return (
    <div className="App">
      <div className="container">
        <Router>
          <Routes path="/home" />
          <Routes path="/:word" />
          <Routes path="/:word/:font/:bground" />
        </Router>
      </div>
    </div>
  );
}

export default App;
