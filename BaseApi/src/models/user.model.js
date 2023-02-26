const mongoose=require("mongoose");

const userShema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    lastname:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true,
        uniqe:true
    },
    password:{
        type:String,
        required:true,
        trim:true
    },
    reset:{
        code:{
            type:String,
            default:null
        },
        time:{
            type:Date,
            default:null
        }
    }
},{timestamps:true});

const User=mongoose.model("User",userShema);

module.exports={User};