import mongoose from "mongoose";

const {Schema}=mongoose;

const adaySchema=new Schema({
    tc:{
        type:String,
        trim:true,
        required:true,
        maxLength:11
    },
    date:{
        type:String,
        required:true
    },
    time:{
        type:String,
        required:true
    }
});

const Aday=mongoose.model("Aday",adaySchema);
export {Aday};