$projectName = "product-manager"


$path = '.\' + $projectName

New-Item -ItemType Directory -Name $projectName
Set-Location -Path $path

Start-Job -ScriptBlock { Start-Process npx -Wait -ArgumentList "create-react-app", "client" }

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
require('./server/routes/product.routes')(app);

app.listen(port, () => {
    console.log(``Listening on port: `${port}``) 
});
"@ | Out-File -FilePath .\server.js


# Create directory structure and template files 
New-Item -ItemType Directory -Path "server\controllers", "server\routes", "server\models", "server\config"
New-Item -ItemType File -Path "server\models\template.model.js", "server\models\product.model.js", "server\controllers\product.controller.js", "server\routes\template.routes.js", "server\routes\product.routes.js", "server\config\mongoose.config.js"

# Controller Files 
@"
module.exports.index = (request, response) => {
    response.json({
        message: 'Hello World'
    });
};
"@ | Out-File -FilePath .\server\controllers\template.controller.js


@"
const { Product } = require('../models/product.model');
module.exports.index = (request, response) => {
    Product.find({})
    .then(allProducts => response.json({product: allProducts}))
    .catch(err => res.json({message: "Something went wrong", error: err}));
}
    // The method below is new
module.exports.createProduct = (request, response) => {
    const { title, price, description } = request.body;
    Product.create({
        title,
        price,
        description
    })
        .then(product => response.json(product))
        .catch(err => response.json(err));
}
"@ | Out-File -FilePath .\server\controllers\product.controller.js


# Routes Files 
@"
const TemplateController = require('../controllers/template.controller');
module.exports = function(app){
    app.get('/api', TemplateController.index);
};
"@ | Out-File -FilePath .\server\routes\template.routes.js

@"
const ProductController = require('../controllers/product.controller');
module.exports = function(app){
    app.get('/api', ProductController.index);
    app.post('/api/product', ProductController.createProduct);
}
"@ | Out-File -FilePath .\server\routes\product.routes.js

# Data Model File
@"
const mongoose = require('mongoose');
const ProductSchema = new mongoose.Schema({
    "title": { type: String },
    "price": { type: Number },
    "description": { type: String }
}, { timestamps: true });
module.exports.Product = mongoose.model('Product', ProductSchema);
"@ | Out-File -FilePath .\server\models\product.model.js


# Database connection File 
@"
const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/Prodmgr_db", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("Established a connection to the database"))
    .catch(err => console.log("Something went wrong when connecting to the database", err));
"@ | Out-File -FilePath .\server\config\mongoose.config.js

# Create components and views directories and files
while (!(Test-Path -Path .\client\src\components\ProductForm.js)) {
    if (test-path .\client\src) {
        New-Item -ItemType Directory -Path "client\src\components", ".\client\src\views";
        New-Item -ItemType File -Path "client\src\components\ProductForm.js", ".\client\src\views\Main.js"
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
           <ProductForm/>
        </div>
    )
};
"@ | Out-File -FilePath .\src\views\Main.js

@"
import React, { useState } from 'react'
import axios from 'axios';
export default () => {

    //keep track of what is being typed via useState hook
    const [title, setTitle] = useState(""); 
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");


    //handler when the form is submitted
    const onSubmitHandler = e => {
        //prevent default behavior of the submit
        e.preventDefault();
        //make a post request to create a new product
        axios.post('http://localhost:8000/api/product', {
            title,
            price,
            description
        })
            .then(res=>console.log(res))
            .catch(err=>console.log(err))
    }

    //onChange to update title, price, and description
    return (
        <>
            <h2>Product Manager</h2>
            <form onSubmit={onSubmitHandler}>
                <p>
                    <label>Title: </label><br/>
                    <input type="text" onChange = {(e)=>setTitle(e.target.value)}/>
                </p>
                <p>
                    <label>Price: </label><br/>
                    <input type="text" onChange = {(e)=>setPrice(e.target.value)}/>
                </p>
                <p>
                    <label>Description: </label><br/>
                    <input type="text" onChange = {(e)=>setDescription(e.target.value)}/>
                </p>
                <button>Create</button>
            </form>
        </>        
    )
}
"@ | Out-File -FilePath .\src\components\ProductForm.js


# Modify the main React App.js file
@"
import React from 'react';
import './App.css';
import ProductForm from './components/ProductForm';

function App() {
  return (
    <div className="App">
      <ProductForm />
    </div>
  );
}

export default App;
"@ | Set-Content -Path .\src\App.js

# Modify the index.html file to add bootstrap 
@"
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta
      name="description"
      content="Web site created using create-react-app"
    />
    <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
    <!--
      manifest.json provides metadata used when your web app is installed on a
      user's mobile device or desktop. See https://developers.google.com/web/fundamentals/web-app-manifest/
    -->
    <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
    <!--
      Notice the use of %PUBLIC_URL% in the tags above.
      It will be replaced with the URL of the `public` folder during the build.
      Only files inside the `public` folder can be referenced from the HTML.

      Unlike "/favicon.ico" or "favicon.ico", "%PUBLIC_URL%/favicon.ico" will
      work correctly both with client-side routing and a non-root public URL.
      Learn how to configure a non-root public URL by running `npm run build`.
    -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z" crossorigin="anonymous">
    <!--
      Bootstrap
    -->
    <title>Product Manager</title>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
    <!--
      This HTML file is a template.
      If you open it directly in the browser, you will see an empty page.

      You can add webfonts, meta tags, or analytics to this file.
      The build step will place the bundled scripts into the <body> tag.

      To begin the development, run `npm start` or `yarn start`.
      To create a production bundle, use `npm run build` or `yarn build`.
    -->
  </body>
</html>
"@ | Set-Content -Path .\public\index.html

Start-Job -Name "Front end" -ScriptBlock { Start-Process npm -Wait -ArgumentList "start" }
Set-Location -Path ..\..\$projectName;
Start-Job -Name "Back end" -ScriptBlock { Start-Process -FilePath "C:\Users\jspar\AppData\Roaming\npm\nodemon.cmd" -ArgumentList ".\server.js" } 