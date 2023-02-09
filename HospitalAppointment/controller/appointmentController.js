import mongoose from "mongoose";
import {Aday} from "../models/appointmentModel.js";

const addAppointment=async(req,res)=>{
    
    var times=["09:00","09:30","10:00","10:30","11:00","11:30","13:00","13:30","14:00","14:30","15:00","15:30","16:00","16:30"]
    //console.log("req.body: ",req.body);
    const {date, time}=req.body;
    var same=false;
    if(date != "" && time != "")
    {
        let toDay=new Date();
        let format=date+" "+time;
        let dateFormat=new Date(format);
        dateFormat.setHours(dateFormat.getHours() + 3);
        //console.log("datef: ",dateFormat)
        if( dateFormat.getFullYear()==toDay.getFullYear() && ( (dateFormat.getMonth()>toDay.getMonth()) || (dateFormat.getMonth()==toDay.getMonth() && dateFormat.getDate()>=toDay.getDate()) ) )
        {
            times.forEach(element=>{
                if(time==element)
                {
                    same=true;
                }
            })
            if(same)
            {
                
                //console.log("girdi");
                try{
                    const query=await Aday.find({$and:[ {date:date} , {time:time} ]})
                    //console.log("query: ",query);
                    if(query !="")
                    {
                        //console.log("ok1");
                        return res.json({succeded:false,
                                appointment:"busy"});
        
                    }else{
                        //console.log("ok2");
                        await Aday.create({
                            tc:res.locals.user,
                            date:date,
                            time:time
                        })    
                        //console.log("appointment: ",appointment);
                        return res.json({succeded:true,
                        appointment:"added"});
                    }
                    
                    
                }catch(error)
                {
                    console.log(error)
                    return res.json({succeded:false,
                        appointment:"error"});
                } 

            }else{
                    return res.json({succeded:false,
                        appointment:"error"});
            } 
        }        
    }
}

const appointmentQuery=async(req, res)=>{

    try{
        var timeList=[];
        //console.log("date: ",req.body.date);
        const query=await Aday.find({date:req.body.date});
        //console.log("query: ",query);
        query.forEach(element=>{
            timeList.push(element.time);
        })
        //console.log("timeList: ",timeList);
        res.json({succeded:true,timeList:timeList})
        
    }catch(error){
        console.log(error);
        res.json({succeded:false})
    }
}


const appointmentCardDetail=async(req, res)=>{
    try{
        const query=await Aday.findById(req.body.id)
        //console.log("query: ",query);
        return res.json({succeded:true,query})
    }catch(error){
        console.log(error);
        return res.json({succeded:false})
    }
}

const appointmentDelete=async(req, res)=>{
    try{
        await Aday.deleteOne({_id:req.body.id})
        return res.json({succeded:true});

    }catch(error){
        console.log(error);
        return res.json({succeded:false});
    }
}       

const addMoreAppointment=async(req, res)=>{
    try{
        const query=await Aday.find({tc:res.locals.user})
        console.log("query: ", query);
        return res.json({succeded:true,query});
    }catch(error){
        console.log(error);
        return res.json({succeded:false});
    }
}

export {addAppointment, appointmentQuery, appointmentCardDetail, appointmentDelete, addMoreAppointment};