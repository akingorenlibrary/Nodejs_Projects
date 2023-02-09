import { Aday } from "../models/appointmentModel.js";

const indexPage=(req,res)=>{
    res.render("index");
}

const errorPage=(req,res)=>{
    res.render("errorPage");
}

const notFoundPage=(req,res)=>{
    res.render("pageNotFound");
}

const validationPage=(req,res)=>{
    res.render("validation");
}

const makeAppointmentPage=(req,res)=>{
    res.render("makeAppointment",{link:"/makeAppointment"});
}

const appointmentDetailPage=async(req,res)=>{
    try{
        const countDb=await Aday.find({tc:res.locals.user}).count();
        const query=await Aday.find({tc:res.locals.user}).sort({date:1})
        return res.render("appointmentDetail",{link:"/appointmentDetail",query,countDb});
    }catch(error){
        console.log(error);
    }
}

const logoutPage=(req,res)=>{
    res.cookie("jwt","",{maxAge:1});
    //req.session.destroy();
    return res.redirect("/");
}

export {indexPage, errorPage, notFoundPage, validationPage, makeAppointmentPage, logoutPage, appointmentDetailPage};