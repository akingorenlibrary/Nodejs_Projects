import {auth} from "../authentication/auth.js";
import jwt from "jsonwebtoken";

const validationPagePost=(req,res)=>{
    const errorMessages={};
    const {tc}=req.body;
    const control=auth(tc);

    if(control.length>0)
    {
        Object.keys(control[0]).forEach(element=>{
            errorMessages[element]=control[0][element];
        });
        return res.json({
            errorMessages,
            process:false
        });
    }
    else
    {
        const token=creatJwtToken(tc);
        res.cookie("jwt",token,{
            maxAge:3600000 // 1hours
        });
        //console.log(req.cookies["jwt"]);
        return res.json({
            process:true
        });
    }
}

function creatJwtToken(tc)
{
    const token=jwt.sign({tc},process.env.JWT_SECRET_KEY,{expiresIn:"1h"});
    return token;
}


export {validationPagePost};