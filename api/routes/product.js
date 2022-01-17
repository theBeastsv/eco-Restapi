const express = require('express');
const router = express.Router();

const ProductController = require('../Controllers/Product.Controller');

//Get a list of all products
router.get('/', ProductController.getproduct);
//Create a new product
router.post('/', ProductController.addproduct);
//Update a product by id
router.patch('/:id', ProductController.updateproduct);

module.exports= router;