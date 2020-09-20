import React from 'react';
import { Router, Redirect } from '@reach/router';
import './App.css';
import Main from './views/Main';
import Details from './views/Details';
import Update from './views/Update'


function App() {
  return (
    <div className="App">
      <div className="container-fluid h-100">
        <Router className="h-100">
          <Main path="products/"/>
          <Details path="products/:id" className="h-100"/>
          <Update path="products/:id/edit"/>
          <Redirect from="/" default noThrow to="/products"/>
        </Router>
      </div>
    </div>
  );
}

export default App;
