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
