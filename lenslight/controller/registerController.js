import {User} from "../models/userModel.js";
import {registerFormValidation} from "../Auth/registerFormValidation.js";

const getRegisterPage=(req,res)=>{
    return res.status(200).render("register",{link:"/register"});
}

const postRegisterPage=async (req,res)=>{
   const errorMessage={};
   const {username,email,password}=req.body;
   //console.log("username: ",username," ","email: ",email," ","password: ",password)
   const kontrol=registerFormValidation(username,email,password);
   if(kontrol.length>0)
   {
        Object.keys(kontrol["0"]).forEach(element=>{
            errorMessage[element]=kontrol["0"][element]
        });
        return res.status(200).json({
            process:false,
            errorMessage:errorMessage
        });
   }
   else
   {
        try{
            
            const createUser=await User.create(req.body);
            res.status(200).json({
                process:true
            });

        }
        catch(error)
        {     
            //console.log(error)  
            if(error.name=="ValidationError")
            {
            Object.keys(error.errors).forEach(element => {
                    errorMessage[element]=error.errors[element].message;
                });
                //console.log(errorMessage)
            }
            if(error.code==11000)
            {
                Object.keys(error.keyPattern).forEach(element=>{
                    errorMessage[element]=`Bu ${element} başka bir hesaba kayıtlı.`;
                })
            }
        
            return res.status(200).json({
                process:false,
                errorMessage:errorMessage
            });
        }
        
   }
  

}

export {getRegisterPage, postRegisterPage};