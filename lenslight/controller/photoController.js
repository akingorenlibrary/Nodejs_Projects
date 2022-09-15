import {Photo} from "../models/photoModel.js";
import {v2 as cloudinary} from "cloudinary";
import fs from "fs";

const postPhotosPage = async (req, res) => {
//console.log("req.files: ",req.files.image.tempFilePath); // C:\xampp\htdocs\Projeler\Nodejs\Proje\lenslight\tmp\tmp-1-1663008389371
try {

    const result = await cloudinary.uploader.upload(
        req.files.image.tempFilePath, {
            use_filename: true,
            folder: "lenslight"
        }
    );
    //console.log("result: ",result);
    await Photo.create({
        name: req.body.name,
        description: req.body.description,
        user: res.locals.user._id,
        url: result.secure_url,
        image_id: result.public_id
    });

    fs.unlinkSync(req.files.image.tempFilePath);

    return res.status(200).redirect("/dashboard");
} catch (error) {
    console.log(error);
    return res.status(500).json({
        process: false
    });
}
}

const getPhotosPage = async (req, res) => {
    let result;
    try {
        if (res.locals.user) {
            result = await Photo.find({
                user: {
                    $ne: res.locals.user._id
                }
            })
        } else {
            result = await Photo.find({})
        }
        return res.status(200).render("photos", {
            result: result,
            link: "/photos"
        })
    } catch (error) {
        return res.status(500).json({
            process: false,
            error: error
        })
    }
}

const getPhotoPage = async (req, res) => {
try {
const result = await Photo.findById({_id: req.params.id}).populate('user');
if (result != null)
{
    let ishavephotouser = false;
    if (res.locals.user && ( (result.user._id).toString() === (res.locals.user._id).toString()) ) 
    {
        ishavephotouser = true;
    }

    return res.status(200).render("photo", {
        result: result,
        link: "/photos",
        ishavephotouser: ishavephotouser
    });   
    
} 
else 
{
    return res.status(404).render("notFound");
}


} 
catch (error) 
{
    console.log(error);
    return res.status(500).render("error", {code: 500});
}
}

const photoDelete = async (req, res) => {
try {
const photo = await Photo.findById({_id: req.params.id}).populate("user");
if (res.locals.user && photo.user._id.toString() === res.locals.user._id.toString()) 
{
    await Photo.findByIdAndRemove({_id: req.params.id});
    await cloudinary.uploader.destroy(photo.image_id);
    return res.status(200).redirect("/dashboard");
} 
else 
{
    return res.status(404).render("notFound");
}
    

} 
catch (error) 
{
    console.log(error);
    return res.status(500).render("error", {code: 500});
}
}


const photoUpdate = async (req, res) => {
try {
const photo = await Photo.findOne({_id: req.params.id}).populate("user");
if (photo && res.locals.user && (photo.user._id.toString()===res.locals.user._id.toString())) {
    if (req.files) 
    {
        await cloudinary.uploader.destroy(photo.image_id);
        const result = await cloudinary.uploader.upload(req.files.image.tempFilePath, {
            use_filename: true,
            folder: "lenslight"
        });
        photo.image_id = result.public_id;
        photo.url = result.secure_url;
        fs.unlinkSync(req.files.image.tempFilePath);
    }
    if (req.body.name != "") 
    {
        photo.name = req.body.name;

    }
    if (req.body.description != "") 
    {
        photo.description = req.body.description;

    }
    photo.save();
    return res.status(200).redirect(`/photo/${req.params.id}`);
} 
else 
{
    return res.status(500).render("error", {
        code: 500
    });
}

} 
catch (error) 
{
    console.log(error);
    return res.status(500).render("error", {
        code: 500
    });
}
}

export {
    postPhotosPage,
    getPhotosPage,
    getPhotoPage,
    photoDelete,
    photoUpdate
};