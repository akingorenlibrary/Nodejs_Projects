const jwt=require("jsonwebtoken");
const {User}=require("../models/user.model.js");
const {Response}=require("../utils/response.js");

const createToken=async(user,res)=>{
    console.log("ok");
    const payolad={
     userName:user.name,
     userId:user._id   
    }

    const token=await jwt.sign(payolad,process.env.JWT_SECRET,{
        algorithm: "HS512",
        expiresIn:process.env.JWT_EXPIRES_IN
    });

    return new Response(token,"Giriş başarılı.").success(res);
}

const tokenCheck=async(req, res, next)=>{
    const headerToken=req.headers.authorization && req.headers.authorization.startsWith("Bearer ")
    if(headerToken){
        const token=req.headers.authorization.split(" ")[1];
        await jwt.verify(token, process.env.JWT_SECRET,async(err,decoded)=>{
            if(err){
                return new Response(null,"Token decoded hatası.").error500(res);
            }else{
                const checkUser=await User.findOne({_id:decoded.userId}).select("_id name lastname email ")
                if(checkUser){
                    req.user=checkUser;
                    next();
                }else{
                    return new Response(null,"Token decoded hatası.").error500(res);
                }
            }
        });
    }else{
        return new Response(null,"Token Hatası.").error401(res);
    }
}

const createTemporaryToken=async(userId, email)=>{
    const payload={
        sub:userId,
        email:email
    }

    const token=await jwt.sign(payload, process.env.JWT_TEMPRORARY_SECRET,{
        expiresIn: process.env.JWT_TEMPRORARY_EXPIRES_IN,
        algorithm:"HS512"
    })

    return token;

}

const decodedTemporaryToken=async(token)=>{
    const checkUser= await jwt.verify(token, process.env.JWT_TEMPRORARY_SECRET,async(err,decoded)=>{
        if(err){
            console.log(err);
            return null;
        }else{
            console.log("decoded: ",decoded);
            const userCheck=await User.findOne({_id:decoded.sub}).select("_id name lastname email ")
            if(userCheck){
                console.log("checkUser: ",userCheck);
                return userCheck;
             }else{
                 return null;
             }
        }
    });

    return checkUser;
}
module.exports={createToken, tokenCheck, createTemporaryToken, decodedTemporaryToken};