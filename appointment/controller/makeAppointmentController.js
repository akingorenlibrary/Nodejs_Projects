import mongoose from "mongoose";
import {Aday} from "../models/aDay.js";
import {dateValidation} from "../validation/makeAppointmentValidation.js";

const makeAppointmentPost=(req,res)=>{

    const errorObject={};
    const {dateInput}=req.body;
    console.log("date: ",dateInput);
    const control=dateValidation(dateInput);
    
    if(control.length>0)
    {
        Object.keys(control[0]).forEach(element=>{
            errorObject[element]=control[0][element];
        })

        return res.json({
            processDate:false,
            errorObject
        });
    }
    else
    {
        return res.json({
            processDate:true
        });
    }
}

const makeAppointmentControlPost=async(req,res)=>{
    const {date,time}=req.body;
    //console.log(req.body);
    const dateTemp=new Date();
    dateTemp=date;
    console.log("dateTem: "+dateTemp);
    console.log("ok");

    /*
    try{
        await Aday.create({tc:req.session["userTc"],date:date,time:time})
    }
    catch(error)
    {
        console.log(error);
        return res.json({processControl:false});
    }
   
    */
    return res.json({processControl:false});
};

export {makeAppointmentPost, makeAppointmentControlPost};