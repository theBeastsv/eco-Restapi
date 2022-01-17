const express = require('express');
const router = express.Router();
const mongoose=require('mongoose');
const Product= require('../model/product');
const bcrypt =require('bcrypt');
const jwt = require('jsonwebtoken');

router.get('/getproduct',async (req, res, next) => {
    try {
        const results = await Product.find({}, { __v: 0 });
        
        res.send(results);
      } catch (error) {
        console.log(error.message);
      }
})
  
      
   
router.post('/addproduct',(req,res,next)=>{
    const user= new Product ({
     
        _id:new mongoose.Types.ObjectId,
        categoryId:req.body.categoryId,
        name:req.body.name,
        imagesURL:req.body.imagesURL,
        price:req.body.price,
        description:req.body.description
    })

    user.save()
    .then(result=>{
        res.status(200).json({
            new_product:result
        })
    })

    .catch(err=>{
        res.status(500).json({
            error: err
        })
    })
    
})



router.post('/updateproduct',async(req,res,next)=>{

    try {
        const id = req.params.id;
        const updates = req.body;
        const options = { new: true };
  
        const result = await Product.findByIdAndUpdate(id, updates, options);
        if (!result) {
          throw createError(404, 'Product does not exist');
        }
        res.send(result);
      } 
      catch (error) {
        console.log(error.message);
        if (error instanceof mongoose.CastError) {
          return next(createError(400, 'Invalid Product Id'));
        }
  
        next(error);
      }
    
})

module.exports= router;