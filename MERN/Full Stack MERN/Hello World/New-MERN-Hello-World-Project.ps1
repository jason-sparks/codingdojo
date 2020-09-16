$projectName = "hello-world"


$path = '.\' + $projectName

New-Item -ItemType Directory -Name $projectName
Set-Location -Path $path

$job = Start-Job -ScriptBlock { Start-Process npx -Wait -ArgumentList "create-react-app", "client" }

npm init -y
npm install express mongoose cors 


# Create the server.js file 
New-Item -ItemType File -Name "server.js"

@"
const express = require('express');
const app = express();
const port = 8000;
const cors = require('cors');

app.use(cors());
require('./server/routes/template.routes')(app);
    
app.listen(port, () => {
    console.log(``Listening on port: `${port}``) 
});
"@ | Out-File -FilePath .\server.js


# Create directory structure and template files 
New-Item -ItemType Directory -Path "server\models", "server\controllers", "server\routes"
New-Item -ItemType File -Path "server\models\template.model.js", "server\controllers\template.controller.js", "server\routes\template.routes.js"

@"
module.exports.index = (request, response) => {
    response.json({
        message: 'Hello World'
    });
};
"@ | Out-File -FilePath .\server\controllers\template.controller.js


@"
const TemplateController = require('../controllers/template.controller');
module.exports = function(app){
    app.get('/api', TemplateController.index);
};
"@ | Out-File -FilePath .\server\routes\template.routes.js

while (!(Test-Path -Path .\client\src\components\Main.js)) {
    if (test-path .\client\src) {
        New-Item -ItemType Directory -Name .\client\src\components;
        New-Item -ItemType File -Name .\client\src\components\Main.js
    }
}
Set-Location -Path .\client

# Install 3rd party packages
# $axios = Start-Job -ScriptBlock { npm install axios }
# Wait-Job -Job $axios
npm install axios

# Create components directory and React component 
New-Item -ItemType Directory -Name .\src\components
New-Item -ItemType File -Name .\src\components\Main.js

@"
import React, { useEffect, useState } from 'react'
import axios from 'axios';

export default () => {
    const [ message, setMessage ] = useState("Loading...")
    useEffect(()=>{
        axios.get("http://localhost:8000/api")
            .then(res=>setMessage(res.data.message))       
    }, []);
    return (
        <div>
            <h2>Message from the backend: {message}</h2>
        </div>
    )
};
"@ | Out-File -FilePath .\src\components\Main.js


# Modify the main React App.js file
@"
import React from 'react';
import './App.css';
import Main from './components/Main';

function App() {
  return (
    <div className="App">
      <Main />
    </div>
  );
}

export default App;
"@ | Set-Content -Path .\src\App.js

$frontend = Start-Job -Name "Frontend" -ScriptBlock { Start-Process npm -Wait -ArgumentList "start" }
Set-Location -Path ..\..\test-project;
$backend = Start-Job -Name "Backend" -ScriptBlock { Start-Process -FilePath "C:\Users\jspar\AppData\Roaming\npm\nodemon.cmd" -ArgumentList ".\server.js" } 