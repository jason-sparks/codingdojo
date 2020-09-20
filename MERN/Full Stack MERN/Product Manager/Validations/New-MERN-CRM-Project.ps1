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
New-Item -ItemType File -Path "server\models\template.model.js", 
                                "server\models\product.model.js", 
                                "server\controllers\product.controller.js", 
                                "server\routes\template.routes.js", 
                                "server\routes\product.routes.js", 
                                "server\config\mongoose.config.js"

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
        .then(product => res.json(product))     // If the request was successful return a 200 response code with the newly created product
        .catch(err => res.status(400).json(err));   // If the request was not successful return a 400 response code with the errors
}

// Methods for retrieving products from the database
module.exports.getAllProducts = (req, res) => {
    Product.find({})
    .then(allProducts => res.json(allProducts))
    .catch(err => res.json(err));
}

module.exports.getProduct = (req, res) => {
    Product.findOne({ _id:req.params.id })
        .then(product => res.json(product))
        .catch(err => res.json(err));
}

// Method for updating an existing product in the database
module.exports.updateProduct = (req, res) => {
    Product.findOneAndUpdate({ _id: req.params.id}, req.body, {
        new:true, 
        runValidators: true // Validate data on updates, updated data isn't validated by default without this. 
    })
        .then(updatedProduct => res.json(updatedProduct))
        .catch(err => res.status(400).json(err));
}

// Method for deleting an existing product in the database
module.exports.deleteProduct = (req, res) => {
    Product.deleteOne({ _id: req.params.id })
        .then(deleteConfirmation => res.json(deleteConfirmation))
        .catch(err => res.json(err))
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
    app.put('/api/products/:id', ProductController.updateProduct);
    app.delete('/api/products/:id', ProductController.deleteProduct);
}
"@ | Out-File -FilePath .\server\routes\product.routes.js

# Data Model File
@"
const mongoose = require('mongoose');
const ProductSchema = new mongoose.Schema({
    "title": { 
        type: String,
        required: [true, "Title is required"],
        minlength: [3, "Title must be at least 3 characters long"]
    },
    "price": { 
        type: Number,
        required: [true, "Price is required"],
        max: [100000000, "Price must be less than 100000000 "]
    },
    "description": { 
        type: String,
        required: [true, "Description is required"],
        minlength: [3, "Description must be at least 3 characters long"],
        maxlength: [20, "Description must not be longer than 140 characters"]
    }
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
        New-Item -ItemType File -Path ".\client\src\components\ProductForm.js", 
                                        ".\client\src\components\ProductList.js", 
                                        ".\client\src\components\DeleteButton.js"
                                        ".\client\src\views\Main.js", 
                                        ".\client\src\views\Details.js", 
                                        ".\client\src\views\Update.js"
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
    const [reqErrors, setReqErrors] = useState({});
    
    const removeFromDom = (productId) => {
        setProducts(products.filter((product) => product._id !== productId));
    }

    const createProduct = (newProduct) => {
        axios.post('http://localhost:8000/api/products', newProduct)
            .then((res) => { 
                    setProducts([...products, res.data]);   // If the response is successful (a 200 return code)
            })
            .catch((err) => {
                console.log(err.response.data.errors)   // If the response is not successful (a 400 return code)
                setReqErrors(err.response.data.errors)
            });
    }

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
           <h2 className="mt-4 mb-4">Product Manager</h2>
           <ProductForm onSubmitProp={createProduct} initialTitle="" initialPrice="" initialDescription="" reqErrors={reqErrors}/>
           <hr className="col-sm-6"/>
           <h3 className="text-muted mb-4">All Products</h3>
           {loaded && <ProductList products={products} removeFromDom={removeFromDom}/>}
        </>
    )
};
"@ | Out-File -FilePath .\src\views\Main.js

@"
import React, { useEffect, useState } from 'react'
import { navigate  } from '@reach/router';
import axios from 'axios';
import DeleteButton from '../components/DeleteButton';



export default (props) => {
    const [product, setProduct] = useState({})

    // const deleteProduct = (productId) => {
    //     axios.delete('http://localhost:8000/api/products/' + productId)
    //         .then(res => {
    //             navigate('/products/')
    //         })
    // }

    useEffect(() => {
        axios.get("http://localhost:8000/api/products/" + props.id)
            .then(res => setProduct({
                ...res.data
            }))
    }, [props])
    return (
        <>
            <div className="mt-4 jumbotron container-fluid align-self-center vertical-center col-sm-8 d-flex justify-content-center">
                <div className="media-body mb-auto">
                    <h1 className="mt-0 display-6">{product.title}</h1>
                    <hr className="my-4 w-50"/>
                    <p className="lead">Price: `${product.price}</p>
                    <p className="lead">Description: {product.description}</p>
                </div>
            </div>

            <div className="row justify-content-center">
                <button className="btn btn-warning mr-5" onClick={(e) => navigate(``/products/`${product._id}/edit``)} >
                    Edit
                </button>
                <DeleteButton productId={product._id} successCallback={() => navigate("/products/")}/>
                {/* <button className="btn btn-danger" onClick={(e) => {deleteProduct(product._id)}}>
                    Delete
                </button> */}
            </div>
            
        </>
    )
}
"@ | Out-File -FilePath .\src\views\Details.js

@"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { navigate  } from '@reach/router';
import ProductForm from '../components/ProductForm';
import DeleteButton from '../components/DeleteButton';

export default (props) => {
    const { id } = props;
    const [product, setProduct] = useState("");
    const [loaded, setLoaded] = useState(false);
    const [reqErrors, setReqErrors] = useState({});


    useEffect(() => {
        axios.get('http://localhost:8000/api/products/' + id)
            .then(res => {
                setProduct(res.data);
                setLoaded(true);
            })
    }, [id])

    const updateProduct = (product) => {
        axios.put('http://localhost:8000/api/products/' + id, product)
            .then((res) => { 
                if (res.data.errors) {
                    console.log(res);
                    setReqErrors(res.data.errors)
                }
                else {
                    navigate('/products/' + id);
                }
                
            })
            .catch((err) => console.log(err));
    };

         return (
            loaded && 
                <>
                <h2 className="mt-4 mb-4">Update a Product</h2>
                <ProductForm 
                    onSubmitProp={updateProduct}
                    initialTitle={product.title}
                    initialPrice={product.price}
                    initialDescription={product.description}
                    reqErrors={reqErrors}
                />
                <DeleteButton productId={product._id} successCallback={() => navigate("/products/")} />
                </>
                
         )
}
"@ | Out-File -FilePath .\src\views\Update.js

@"
import React, { useState } from 'react'

export default (props) => {
    const { initialTitle, initialPrice, initialDescription, reqErrors, onSubmitProp } = props;

    //keep track of what is being typed via useState hook
    const [title, setTitle] = useState(initialTitle); 
    const [price, setPrice] = useState(initialPrice);
    const [description, setDescription] = useState(initialDescription);
    

    //handler when the form is submitted
    const onSubmitHandler = (e) => {
        //prevent default behavior of the submit
        e.preventDefault();
        //make a post request to create a new product
        onSubmitProp({title, price, description})
        setTitle(initialTitle)
        setPrice(initialPrice)
        setDescription(initialDescription);
    }

    //onChange to update title, price, and description
    return (
        <>
            <form onSubmit={onSubmitHandler} className="container">
                <div className="form-group row d-flex justify-content-center">
                    <div className="bg-light border rounded p-2 form-group row d-flex justify-content-start col-sm-6">
                        <label className="col-sm col-form-label d-flex justify-content-start">Title: </label>
                        <div className="col-sm-8 text-left">                
                            <input 
                            type="text" 
                            name="title" value={title}
                            className="form-control d-flex justify-content-end" 
                            onChange = {(e)=>setTitle(e.target.value)} />
                            {/* Server side Validation */}
                            { reqErrors.title ? 
                            <small className="text-danger">{reqErrors.title.message}</small> : 
                            null } 
                        </div>
                    </div>

                </div>

                <div className="form-group row d-flex justify-content-center">
                    <div className="bg-light border rounded p-2 form-group row d-flex justify-content-start col-sm-6">
                        <label className="col-sm col-form-label d-flex justify-content-start">Price: </label>
                        <div className="col-sm-8 text-left">                
                            <input 
                            type="text" 
                            name="price" value={price}
                            className="form-control d-flex justify-content-end" 
                            onChange = {(e)=>setPrice(e.target.value)}/>
                            {/* Server side Validation */}
                            { reqErrors.price ? 
                            <small className="text-danger">{reqErrors.price.message}</small> :
                             null }
                        </div>
                    </div>                    
                </div>
                    
                <div className="form-group row d-flex justify-content-center">
                    <div className="bg-light border rounded p-2 form-group row d-flex justify-content-start col-sm-6">
                        <label className="col-sm col-form-label d-flex justify-content-start">Description: </label>
                        <div className="col-sm-8 text-left">
                            <input 
                            type="text" 
                            name="description" value={description}
                            className="form-control d-flex justify-content-end" 
                            onChange = {(e)=>setDescription(e.target.value)}/>
                            {/* Server side Validation */}
                            { reqErrors.description ? 
                            <small className="text-danger">{reqErrors.description.message}</small> :
                             null }
                        </div>
                    </div>
                </div>

                <div className="form-group row d-flex justify-content-center">
                    <div className="col-sm-3">
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </div>
                </div>
            </form>
        </>        
    )
}
"@ | Out-File -FilePath .\src\components\ProductForm.js

@"
import React from 'react'
import { Link } from '@reach/router';
import DeleteButton from './DeleteButton';

export default (props) => {
    const { products, setProducts } = props;
    // const [products, setProducts] = useState([]);

    const removeFromDom = productId => {
        setProducts(products.filter(product => product._id !== productId))
    }

    return (
        <div className="d-flex justify-content-center">
            <ul className="list-group list-group-flush col-sm-6">
                {props.products.map((product, id) => {
                    return (
                        <li className="list-group-item lead" key={id}>
                            <div className="text-left row justify-content-between">
                                <Link to={"/products/" + product._id}>{product.title}</Link>
                                <DeleteButton productId={product._id} successCallback={()=>removeFromDom(product._id)}/>
                                {/* <button className="btn btn-danger" onClick={(e)=>{deleteProduct(product._id)}} >Delete</button> */}
                            </div>
                        </li>
                    ) 
                })}
            </ul>
        </div>
    )
}
"@ | Out-File -FilePath .\src\components\ProductList.js

@"
import React from 'react'
import axios from 'axios';
export default props => {
    const { productId, successCallback } = props;
    const deleteProduct = (e)=> {
        axios.delete('http://localhost:8000/api/products/' + productId)
            .then(res=>{
                successCallback();
            })
    }
    return (
        <button className="btn btn-danger" onClick={deleteProduct}>
            Delete
        </button>
    )
}
"@ | Out-File -FilePath .\src\components\DeleteButton.js

# Modify the root React App.js file
@"
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
      Learn how to configure a non-root public URL by running ``npm run build``.
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

      To begin the development, run ``npm start`` or ``yarn start``.
      To create a production bundle, use ``npm run build`` or ``yarn build``.
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