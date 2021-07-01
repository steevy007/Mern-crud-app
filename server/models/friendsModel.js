const mongoose=require('mongoose');

const friendShema=mongoose.Schema({
    nom:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    description:{
        type:String,
        required:false
    }
})

module.exports=mongoose.model('Friends',friendShema);