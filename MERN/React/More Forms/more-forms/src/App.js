import React, { useState } from 'react';
import './App.css';
import HookForm from './components/HookForm';
import Results from './components/Results';

function App() {
  const [ firstName, setFirstName ] = useState("");
  const [ lastName, setLastName ] = useState("");
  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");
  const [ confirmPassword, setConfirmPassword ] = useState("");

  return (
    <div className="App">
      <HookForm setFirstName={setFirstName} setLastName={setLastName} setEmail={setEmail} setPassword={setPassword} password={password} setConfirmPassword={setConfirmPassword}/>
      <Results firstName={firstName} lastName={lastName} email={email} password={password} confirmPassword={confirmPassword}/>
    </div>
  );
}

export default App;