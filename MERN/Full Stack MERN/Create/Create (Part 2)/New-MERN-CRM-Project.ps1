$projectName = "test-project"


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

require('./server/config/mongoose.config');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
require('./server/routes/person.routes')(app);

app.listen(port, () => {
    console.log(``Listening on port: `${port}``) 
});
"@ | Out-File -FilePath .\server.js


# Create directory structure and template files 
New-Item -ItemType Directory -Path "server\controllers", "server\routes", "server\models", "server\config"
New-Item -ItemType File -Path "server\models\template.model.js", "server\models\person.model.js", "server\controllers\person.controller.js", "server\routes\template.routes.js", "server\routes\person.routes.js", "server\config\mongoose.config.js"

# Controller Files 
@"
module.exports.index = (request, response) => {
    response.json({
        message: 'Hello World'
    });
};
"@ | Out-File -FilePath .\server\controllers\template.controller.js


@"
const { Person } = require('../models/person.model');
module.exports.index = (request, response) => {
    Person.find({})
    .then(allPeople => response.json({person: allPeople}))
    .catch(err => res.json({message: "Something went wrong", error: err}));
}
    // The method below is new
module.exports.createPerson = (request, response) => {
    const { firstName, lastName } = request.body;
    Person.create({
        firstName,
        lastName
    })
        .then(person => response.json(person))
        .catch(err => response.json(err));
}
"@ | Out-File -FilePath .\server\controllers\person.controller.js


# Routes Files 
@"
const TemplateController = require('../controllers/template.controller');
module.exports = function(app){
    app.get('/api', TemplateController.index);
};
"@ | Out-File -FilePath .\server\routes\template.routes.js

@"
const PersonController = require('../controllers/person.controller');
module.exports = function(app){
    app.get('/api', PersonController.index);
    app.post('/api/people', PersonController.createPerson);
}
"@ | Out-File -FilePath .\server\routes\person.routes.js

# Data Model File
@"
const mongoose = require('mongoose');
const PersonSchema = new mongoose.Schema({
    firstName: { type: String },
    lastName: { type: String }
}, { timestamps: true });
module.exports.Person = mongoose.model('Person', PersonSchema);
"@ | Out-File -FilePath .\server\models\person.model.js


# Database connection File 
@"
const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/crm_db", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("Established a connection to the database"))
    .catch(err => console.log("Something went wrong when connecting to the database", err));
"@ | Out-File -FilePath .\server\config\mongoose.config.js

# Create components and views directories and files
while (!(Test-Path -Path .\client\src\components\PersonForm.js)) {
    if (test-path .\client\src) {
        New-Item -ItemType Directory -Path "client\src\components", ".\client\src\views";
        New-Item -ItemType File -Path "client\src\components\PersonForm.js", ".\client\src\views\Main.js"
    }
}

Set-Location -Path .\client
npm install axios

# Set content for components and views files
@"
import React, { useEffect, useState } from 'react'
import axios from 'axios';

export default () => {
    return (
        <div>
           <PersonForm/>
        </div>
    )
};
"@ | Out-File -FilePath .\src\views\Main.js

@"
import React, { useState } from 'react'
import axios from 'axios';
export default () => {

    //keep track of what is being typed via useState hook
    const [firstName, setFirstName] = useState(""); 
    const [lastName, setLastName] = useState("");

    //handler when the form is submitted
    const onSubmitHandler = e => {
        //prevent default behavior of the submit
        e.preventDefault();
        //make a post request to create a new person
        axios.post('http://localhost:8000/api/people', {
            firstName,
            lastName
        })
            .then(res=>console.log(res))
            .catch(err=>console.log(err))
    }

    //onChange to update firstName and lastName
    return (
        <form onSubmit={onSubmitHandler}>
            <p>
                <label>First Name</label><br/>
                <input type="text" onChange = {(e)=>setFirstName(e.target.value)}/>
            </p>
            <p>
                <label>Last Name</label><br/>
                <input type="text" onChange = {(e)=>setLastName(e.target.value)}/>
            </p>
            <input type="submit"/>
        </form>
    )
}
"@ | Out-File -FilePath .\src\components\PersonForm.js


# Modify the main React App.js file
@"
import React from 'react';
import './App.css';
import PersonForm from './components/PersonForm';

function App() {
  return (
    <div className="App">
      <PersonForm />
    </div>
  );
}

export default App;
"@ | Set-Content -Path .\src\App.js

$frontend = Start-Job -Name "Frontend" -ScriptBlock { Start-Process npm -Wait -ArgumentList "start" }
Set-Location -Path ..\..\$projectName;
$backend = Start-Job -Name "Backend" -ScriptBlock { Start-Process -FilePath "C:\Users\jspar\AppData\Roaming\npm\nodemon.cmd" -ArgumentList ".\server.js" } 