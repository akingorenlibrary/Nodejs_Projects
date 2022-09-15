import mongoose from "mongoose";

const {Schema}=mongoose;

const photoSchema=new Schema({
    name:{
        type:String,
        required:true,
        trim:true //başında veya sonunda boşluk varsa siler.
    },
    description:{
        type:String,
        required:true,
        trim:true
    },
    Date:{
        type:Date,
        default:Date.now
    },
    user:{
        type: Schema.Types.ObjectId,
        ref:"User"
    },
    url:{
        type:String,
        required:true
    },
    image_id:{
        type:String,
        required:true
    }
});

const Photo=mongoose.model("Photo",photoSchema);

export {Photo};
