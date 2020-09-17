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
module.exports.index = (req, res) => {
    res.json({
        message: 'Hello World'
    });
};
"@ | Out-File -FilePath .\server\controllers\template.controller.js

@"
const { Product } = require('../models/product.model');

// Method for adding a new product to the database
module.exports.createProduct = (req, res) => {
    const { title, price, description } = req.body;
    Product.create({
        title,
        price,
        description
    })
        .then(product => res.json(product))
        .catch(err => res.json(err));
}

// Methods for retrieving products from the database
module.exports.getAllProducts = (req, res) => {
    Product.find({})
    .then(allProducts => res.json(allProducts))
    .catch(err => res.json({message: "Something went wrong", error: err}));
}

module.exports.getProduct = (req, res) => {
    Product.findOne({_id:req.params.id})
        .then(product => res.json(product))
        .catch(err => res.json({message: "Something went wrong", error: err}));
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
    app.post('/api/products', ProductController.createProduct);
    app.get('/api/products', ProductController.getAllProducts);
    app.get('/api/products/:id', ProductController.getProduct);
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
        New-Item -ItemType Directory -Path ".\client\src\components", ".\client\src\views";
        New-Item -ItemType File -Path ".\client\src\components\ProductForm.js", ".\client\src\components\ProductList.js", ".\client\src\views\Main.js", ".\client\src\views\Details.js"
    }
}

Set-Location -Path .\client
npm install axios @reach/router

# Set content for components and views files
@"
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import ProductForm from '../components/ProductForm';
import ProductList from '../components/ProductList';

export default () => {
    const [products, setProducts] = useState([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:8000/api/products')
            .then(res => {
                setProducts(res.data);
                setLoaded(true);
            })
            .catch(err => console.log("Something went wrong: ", err));
    },[]);

    return (
        <>
           <ProductForm/>
           <hr className="col-sm-6"/>
           <h3 className="text-muted">All Products</h3>
           {loaded && <ProductList products={products} />}
        </>
    )
};
"@ | Out-File -FilePath .\src\views\Main.js

@"
import React, { useEffect, useState } from 'react'
import axios from 'axios';

export default props => {
    const [product, setProduct] = useState({})
    useEffect((props) => {
        axios.get("http://localhost:8000/api/products/" + props.id)
            .then(res => setProduct({
                ...res.data
            }))
    }, [])
    return (
        <>
            <div className="mt-4 jumbotron container-fluid align-self-center vertical-center col-sm-8 d-flex justify-content-center">
                <div className="media-body mb-auto">
                    <h1 className="mt-0 display-6">{product.title}</h1>
                    <hr class="my-4 col-sm-6"/>
                    <p className="lead">Price: ${product.price}</p>
                    <p className="lead">Description: {product.description}</p>
                </div>
            </div>
            <img className="mr-3 mt-5 mb-auto" src={product.image} alt="Generic placeholder"/>
        </>
    )
}
"@ | Out-File -FilePath .\src\views\Details.js

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
        axios.post('http://localhost:8000/api/products', {
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
            <h2 className="mt-4 mb-4">Product Manager</h2>
            <form onSubmit={onSubmitHandler}>
                <div className="form-group row d-flex justify-content-center">
                    <div className="bg-light border rounded p-2 form-group row d-flex justify-content-start col-sm-6">
                        <label className="col-sm col-form-label d-flex justify-content-start">Title: </label>
                        <div className="col-sm-8">                
                            <input type="text" className="form-control d-flex justify-content-end" onChange = {(e)=>setTitle(e.target.value)}/>
                        </div>
                    </div>

                </div>

                <div className="form-group row d-flex justify-content-center">
                    <div className="bg-light border rounded p-2 form-group row d-flex justify-content-start col-sm-6">
                        <label className="col-sm col-form-label d-flex justify-content-start">Price: </label>
                        <div className="col-sm-8">                
                            <input type="text" className="form-control d-flex justify-content-end" onChange = {(e)=>setPrice(e.target.value)}/>
                        </div>
                    </div>                    
                </div>
                    
                <div className="form-group row d-flex justify-content-center">
                    <div className="bg-light border rounded p-2 form-group row d-flex justify-content-start col-sm-6">
                        <label className="col-sm col-form-label d-flex justify-content-start">Description: </label>
                        <div className="col-sm-8">
                            <input type="text" className="form-control d-flex justify-content-end" onChange = {(e)=>setDescription(e.target.value)}/>
                        </div>
                    </div>
                </div>

                <div className="form-group row d-flex justify-content-center">
                    <div className="col-sm-3">
                        <button type="submit" className="btn btn-primary">Create</button>
                    </div>
                </div>
            </form>
        </>        
    )
}
"@ | Out-File -FilePath .\src\components\ProductForm.js

@"
import React from 'react'

export default props => {
    return (
        <div className="d-flex justify-content-center">
            <ul className="list-group list-group-flush col-sm-4">
                {props.products.map((product, id) => {
                    return (
                        <li className="list-group-item lead" key={id}><a href={'/products/' + product._id}>{product.title}</a></li>
                        ) 
                })}
            </ul>
        </div>
    )
}
"@ | Out-File -FilePath .\src\components\ProductList.js


# Modify the main React App.js file
@"
import React from 'react';
import { Router } from '@reach/router';
import './App.css';
import Main from './views/Main';
import Details from './views/Details';
// import ProductForm from './components/ProductForm';

function App() {
  return (
    <div className="App">
      <div className="container-fluid h-100">
        <Router className="h-100">
          <Main path="products/"/>
          <Details path="products/:id" className="h-100"/>
        </Router>
      </div>
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

# Modify the App.css file to modify defaults
@"
html, body {
    height: 100%;
  }
  
  .App {
    text-align: center;
  }
  
  #root {
    height: 100%;
  }
  
  .App {
      height: 100%;
  }
  
  .App-logo {
    height: 40vmin;
    pointer-events: none;
  }
  
  @media (prefers-reduced-motion: no-preference) {
    .App-logo {
      animation: App-logo-spin infinite 20s linear;
    }
  }
  
  .App-header {
    background-color: #282c34;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: calc(10px + 2vmin);
    color: white;
  }
  
  .App-link {
    color: #61dafb;
  }
  
  @keyframes App-logo-spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }  
"@ | Set-Content -Path .\src\App.css


Start-Job -Name "Front end" -ScriptBlock { Start-Process npm -Wait -ArgumentList "start" }
Set-Location -Path ..\..\$projectName;
Start-Job -Name "Back end" -ScriptBlock { Start-Process -FilePath "C:\Users\jspar\AppData\Roaming\npm\nodemon.cmd" -ArgumentList ".\server.js" } 