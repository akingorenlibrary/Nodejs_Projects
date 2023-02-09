import mongoose from "mongoose";

const {Schema}=mongoose;

const adaySchema=new Schema({
    tc:{
        type:String,
        required:true,
        trim:true
    },
    date : { type : String,required:true},
    time : { type: String,required:true}
});

const Aday=mongoose.model("Aday",adaySchema);
export {Aday};