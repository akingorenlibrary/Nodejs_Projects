import mongoose from "mongoose";
import bcryptjs from "bcryptjs";


const {Schema}=mongoose;

const userSchema=new Schema({
    username:{
        type:String,
        required:[true,"Username boş bırakılamaz."],
        unique:true,
        lowercase:true, //girilen username'i otomatik küçük harfe çevirir.
        maxLength:[50,"Username maksimum 50 karakter uzunluğunda olmalıdır."]
    },
    email:{
        type:String,
        required:[true,"Email boş bırakılamaz."],
        unique:true,
        maxLength:[100,"Email maksimum 100 karakter uzunluğunda olmalıdır."]
    },
    password:{
        type:String,
        required:[true,"Parola boş bırakılamaz."],
        minLength:[6,"Parola minimum 6 karakter uzunluğunda olmalıdır."],
        maxLength:[50,"Parola maksimum 50 karakter uzunluğunda olmalıdır."]
    },
    followings:[{
        type:Schema.Types.ObjectId,
        ref:"User"
    }],
    followers:[{
        type:Schema.Types.ObjectId,
        ref:"User"
    }]
},{timestamps:true});

userSchema.pre("save",function(next){
    const user=this;
    bcryptjs.genSalt(10, function(err, salt) {
        bcryptjs.hash(user.password, salt, function(err, hash) {
            user.password=hash;
            next();
        });
    });
});

const User=mongoose.model("User",userSchema);
export {User};
