import {Auth} from "../middilewares/validationMiddileware.js";
import jwt from "jsonwebtoken";

const validationControl=(req,res)=>{
    let control=false;
    const {tc}=req.body;
    control=Auth(tc);
    console.log("kontrol: ",control)
    if(control)
    {
        const token=jwtCreate(tc);
        res.cookie("jwt",token,{
            maxAge:3600000*24 // 1hours * 24 = 24 hours
        })
        return res.json({succeded:true})

    }else{
        return res.json({succeded:false})
    }
}

function jwtCreate(tc){
    const token=jwt.sign({tc}, process.env.JWT_SECRET, { expiresIn:"1d" });
    return token;
}

export {validationControl};