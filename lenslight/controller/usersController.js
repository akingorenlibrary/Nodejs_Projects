import {User} from "../models/userModel.js";
import { Photo } from "../models/photoModel.js";

const getUsersPage=async (req,res)=>{
try
{
    const users=await User.find({_id:{$ne:res.locals.user._id}});
    return res.status(200).render("users",{link:"/users",users:users});
}
catch(error)
{
    console.log(error);
    return res.status(500).render("error", {code: 500}); 
}
}

const getUserPage=async (req,res)=>{
if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) 
{
    try{
        const user=await User.findById({_id:req.params.id});
        if(user)
        {
            const UserPhotos=await Photo.find({user:req.params.id});
            const isFollowers=user.followers.some(element=>{
                return element.equals(res.locals.user.id);
            })
            return res.status(200).render("user",{link:"/users",user:user,userphotos:UserPhotos,isFollowers:isFollowers});
        }
        else
        {
            return res.status(404).render("notFound");
        }
    }
    catch(error)
    {
        console.log(error);   
        return res.status(500).render("error", {code: 500}); 
    }
}
else
{
return res.status(404).render("notFound");
}

}

const follow=async (req,res)=>{
try{
    await User.updateOne({$and:[{_id:res.locals.user._id},{followings:{$ne:req.params.id}}]},
    {$push:{followings:req.params.id}
    },{new:true});

    await User.updateOne({$and:[{_id:req.params.id},{followers:{$ne:res.locals.user._id}}]},
        {$push:{followers:res.locals.user._id}
    },{new:true});

    return res.status(200).redirect(`/user/${req.params.id}`);

}
catch(error){
    console.log(error);
    return res.status(500).json({
        process:false
    });
}
     
}

const unfollow=async (req,res)=>{
    try{
        await User.findByIdAndUpdate({_id:res.locals.user._id},{
            $pull:{followings:req.params.id}
        },{new:true});

        await User.findByIdAndUpdate({_id:req.params.id},{
            $pull:{followers:res.locals.user._id}
        },{new:true})

        return res.status(200).redirect(`/user/${req.params.id}`);
    }
    catch(error){
        console.log(error);
        return res.status(200).json({
            process:false
        });
    }

}


export {getUsersPage, getUserPage ,unfollow ,follow};