const mongoose= require('mongoose');

const userSchema= new mongoose.Schema({
_id:mongoose.Schema.Types.ObjectId,
    firstname:{
        type: String,
        required: true
    },
    lastname:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    role:{
        type: String,
        required: true
    }

})



const User = mongoose.model('User',userSchema);
module.exports = User ;