import {User} from "../models/userModel.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";


const getLoginPage=(req,res)=>{
    return res.status(200).render("login",{link:"/login"});
}

const postLoginPage=async (req,res)=>{
    const {username,password}=req.body;
    const user=await User.findOne({username:username})
    let same=false;

    if(user)
    {   
        same=await bcryptjs.compare(password, user.password);
    }
    else
    {
        return res.status(401).json({
            process:false,
            error:"Böyle bir kullanıcı yok."
        })
    }
    
    if(same)
    {
       const token=createToken(user._id);

       res.cookie("jwt",token,{
        maxAge:1000*60*60*24 // 24 hours
       });

       return res.redirect("/dashboard");
    }
    else
    {
        return res.status(400).json({
        process:false,
        message:"Şifre yanlış."
         })

    }

        function createToken(user_id){
        return jwt.sign({user_id},process.env.JWT_TOKEN,{
            expiresIn:"1d"
        });
    }
}

export {getLoginPage, postLoginPage};