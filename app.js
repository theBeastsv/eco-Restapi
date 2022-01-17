const express = require('express');
const app= express();
const mongoose= require('mongoose');
const bodyParser=require('body-parser');
const cors=require('cors');
const morgan=require('morgan');

const userRoute=require('./api/routes/user')
const productRoute = require('./api/routes/product')

mongoose.connect('mongodb+srv://shubham:1q2w3e@ecom.gqx0n.mongodb.net/ecom?retryWrites=true&w=majority');
mongoose.connection.on('error',err=>{
    console.log("connection fail");
})

mongoose.connection.on('connected',connected=>{
    console.log("connected");
})

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json())


app.use('/user',userRoute);
app.use('/product',productRoute);

app.use((req,res,next)=>{
    res.status(200).json({
        message:"app is working"
    })
})


app.use((req,res,next)=>{
    res.status(404).json({
        error:"BaD REQUEST"
    })
})


/* app.get('/', (req, res) => {
    res.send('Hello World!')
  })
 */

module.exports=app;