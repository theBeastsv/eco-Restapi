const mongoose= require('mongoose');

const productSchema = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    categoryId:
    {
        type:Number,
        required: true
    },
    name:
    {
        type:String,
        required: true
    },
    imagesURL:
    {
        type:String
    },
    price:
    {
        type:Number
    },
    description:
    {
        type:String
    }

});



const Product = mongoose.model('Product',productSchema);

module.exports = Product;