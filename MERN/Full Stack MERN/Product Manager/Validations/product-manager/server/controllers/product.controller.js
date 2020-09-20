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