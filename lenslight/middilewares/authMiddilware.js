import jwt from "jsonwebtoken";
import {User} from "../models/userModel.js";

const UserToken=(req,res,next)=>{
    const token=req.cookies["jwt"];

    if(token)
    {
        jwt.verify(token, process.env.JWT_TOKEN,async (err,decoded)=>{
            if(decoded)
            {   
                const user=await User.findById(decoded.user_id);
                res.locals.user=user;
                next();
            }
            else if(err)
            {
                console.log(err);
                res.locals.user=null;
                next();
            }
        })
    }
    else
    {
        res.locals.user=null;
        next();
    }
}


const authMiddilwareToken=(req,res,next)=>{
    const token=req.cookies["jwt"];
    if(token)
    {
        jwt.verify(token,process.env.JWT_TOKEN,(err)=>{
            if(err)
            {
                console.log(err);
                return res.redirect("/login");
            }
            else
            {
                next();
            }
        })
    }
    else
    {
        return res.redirect("/login");
    }
}

export {authMiddilwareToken, UserToken};