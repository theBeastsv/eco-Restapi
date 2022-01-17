const express = require('express');
const router = express.Router();
const mongoose=require('mongoose');
const User= require('../model/user');
const bcrypt =require('bcrypt');
const jwt = require('jsonwebtoken');

router.get('/alluser',(req,res,next)=>{
    User.find({}, function (err, users) {
        if (err) return res.status(500).send("There was a problem finding the users.");
        res.status(200).send(users);
    });
})

router.post('/signup',(req,res,next)=>{
    bcrypt.hash(req.body.password,10,(err , hash)=>{
        if(err){
            return res.status(500).json({
                error:err
            })
        }
        else
        {
                 const user= new User({
                _id:new mongoose.Types.ObjectId,
                firstname:req.body.firstname,
                lastname:req.body.lastname,
                email:req.body.email,
                password:hash,
                role:req.body.role
            })

            user.save()
            .then(result=>{
                res.status(200).json({
                    new_user:result
                })
            })
        
            .catch(err=>{
                res.status(500).json({
                    error: err
                })
            })
        }
    
    }) 

    })


router.post('/login',(req,res,next)=>{
    User.find({email:req.body.email})
    .exec()
    .then(user=>{
        if(user.length < 1){
            return res.status(401).json({
                error: "User not exist"
            })
        }
        bcrypt.compare(req.body.password,user[0].password,(err,result)=>
        {
            if(!result){
                return res.status(401).json({
                    error:"Password is incorrect"
                })
            }
      if(result)
      {
        const token = jwt.sign(
            {
                firstname:user[0].firstname,
                email:user[0].email,
                role:user[0].role
            },'this is imp txt',
            {
                expiresIn:"24h"
            }
            );
            res.status(200).json({
                firstname:user[0].firstname,
                email:user[0].email,
                role:user[0].role,
                token:token
            })
      }
        }

 )
        
    })
    .catch(err=>{
        res.status(500).json({
            error:err
        })
    })
})

/* 
route.post('/findAll',(req,res,next)=>
{
    User.find({email:req.body.email})
    .exec()
    .then(user=>{
        if(user.length < 1){
            return res.status(401).json({
                error: "User not exist"
            })
        }
        bcrypt.compare(req.body.password,user[0].password,(err,result)=>
        {
            if(!result){
                return res.status(401).json({
                    error:"Password is incorrect"
                })
            }
      if(result)
      {
        const token = jwt.sign(
            {
                firstname:user[0].firstname,
                email:user[0].email,
                role:user[0].role
            },'this is imp txt',
            {
                expiresIn:"24h"
            }
            );
            res.status(200).json({
                firstname:user[0].firstname,
                email:user[0].email,
                role:user[0].role,
                token:token
            })
      }
        }

 )
        
    })
    .catch(err=>{
        res.status(500).json({
            error:err
        })
    })
})
 */


module.exports = router;