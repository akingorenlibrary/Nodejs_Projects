import { Photo } from "../models/photoModel.js";
import { User } from "../models/userModel.js";

const getIndexPage=async (req,res)=>{
    const photos = await Photo.find().sort({ uploadedAt: -1 }).limit(3);
    const numberOfUser=await User.countDocuments({});
    const numberOfPhotos=await Photo.countDocuments({});
    return res.render("index",{link:"/",photos:photos,numberOfUser:numberOfUser, numberOfPhotos:numberOfPhotos});
}

export {getIndexPage};