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
        runValidators: true
    })
        .then(updatedProduct => res.json(updatedProduct))
        .catch(err => res.json(err));
}

// Method for deleting an existing product in the database
module.exports.deleteProduct = (req, res) => {
    Product.deleteOne({ _id: req.params.id })
        .then(deleteConfirmation => res.json(deleteConfirmation))
        .catch(err => res.json(err))
}
