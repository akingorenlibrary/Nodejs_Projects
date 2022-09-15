import {Photo} from "../models/photoModel.js";
import {User} from "../models/userModel.js";

const getDashboard=async (req,res)=>{
    const result=await Photo.find({user:res.locals.user._id});
    const user=await User.find({_id:res.locals.user._id}).populate(["followers","followings"]);
    //console.log("user: ",user[0].followers);
    return res.status(200).render("dashboard",{link:"/dashboard",result:result,user:user});
}

const getLogout=(req,res)=>{
    res.cookie("jwt","",{
        maxAge:1
    });
    return res.redirect("/login");
}


export {getDashboard,getLogout};