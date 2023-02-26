const {User}=require("../models/user.model.js");
const {Response}=require("../utils/response.js");
const bcrypt=require("bcrypt");
const {createToken, createTemporaryToken, decodedTemporaryToken}=require("../middlewares/auth.js");
const crypto=require("crypto");
const { sendEmail } = require("../utils/sendMail.js");
const moment = require("moment");

const login=async(req, res)=>{
    //console.log("req.body: ",req.body);
    const {email,password}=req.body;
    try{

        let userControl=false;
        userControl=await User.findOne({email});
        //console.log("emailControl: ",emailControl);
        if(userControl){
            let passwordControl=false;
            passwordControl=await bcrypt.compare(password, userControl.password);
            //console.log("passwordControl: ",passwordControl);
            if(passwordControl){
                createToken(userControl, res);
                //return new Response(null,"Giriş başarılı.").success(res);
            }else{
                return new Response(null,"Email veya şifre hatalı.").error400(res);
            }
        }else{
            return new Response(null,"Email veya şifre hatalı.").error400(res);
        }

    }catch(error){
        console.log(error);
        return new Response(error,"Hata oluştu.").error500(res);
    }
}

const register=async(req, res)=>{
    const {email, password, name, lastname}=req.body;
    let newPassword;
    try{
        const userCheck=await User.findOne({email});
        if(userCheck)
        {
            console.log("Böyle bir email var.");
            return new Response(null,"Böyle bir email var.").error400(res);
            //return res.json({"description":"Böyle bir email var."});
        }else{
            newPassword=await bcrypt.hash(password, 10);
            console.log("password: ",newPassword);
            const userSave=new User({name,lastname,email,password:newPassword});
            await userSave.save()
            .then((result)=>{
                return new Response(result,"Kayıt Başarılı.").success(res);
            })
            .catch(err=>{
                console.log(err);
                return new Response(err,"Hata oluştu.").error500(res);
            })
        }
    }catch(error){
        console.log(error);
        return new Response(error,"Hata oluştu.").error500(res);
    }
}


const me=(req, res)=>{
    console.log("Dashboard sayfası: ",req.user);
}

const forgetPassword=async(req, res)=>{
    const {email}=req.body;
    const userInfo=await User.findOne({email});
    if(userInfo){
        console.log("userinfo: ",userInfo);
        const resetCode=crypto.randomBytes(3).toString("hex");
        await sendEmail({
            from:process.env.EMAIL_USER,
            to:userInfo.email,
            Subject:"Şifre Sıfırlama",
            text:`Şifre sıfırlama kodunuz: ${resetCode}`
        },res)

        await User.updateOne(
            {email},
            { reset:
                {
                    code:resetCode,
                    time:moment(new Date()).add(15,"minute").format("YYYY-MM-DD HH:mm:ss")
                } })

        return new Response(userInfo,"Şifre Sıfırlama Linki Gönderildi.").success(res)
    }else{
        return new Response(null,"Şifre Sıfırlama Linki Gönderildi.").success(res)
    }
}


const resetCodeCheck=async(req, res)=>{
    const {email, code}=req.body;

    const userInfo=await User.findOne({email}).select("_id name lastname email reset");
    if(userInfo){  
        const dbTime=moment(userInfo.reset.time);
        const nowTime=moment(new Date())
        
        const timeDiff= dbTime.diff(nowTime, "minutes")
        console.log("zaman farkı: ",timeDiff);

        if(timeDiff<=0 || !(userInfo.reset.code===code)){
            return new Response(null,"Geçersiz kod.2").error400(res);
        }else{
         const temporaryToken=await createTemporaryToken(userInfo._id, userInfo.email)  
         return new Response(temporaryToken, "Şifre sıfırlama tokenı.").success(res);  
        }
    }else{
        return new Response(null,"Geçersiz kod.1").error400(res);
    }
}

const resetPassword=async(req, res)=>{
    const {token, password}=req.body;
    const decodedToken=await decodedTemporaryToken(token);
    console.log("decodedToken", decodedToken);
    if(decodedToken){     
        const hashPassword=await bcrypt.hash(password, 10);
        await User.findByIdAndUpdate({
            _id:decodedToken._id
        },{
            reset:{
                code:null,
                time:null
            }, 
            password:hashPassword
        })

        return new Response(decodedToken, "Şifre değiştirildi.").success(res);
    }else{
        return new Response(null, "Token hatası.").error400(res);
    }
}

module.exports={
    login, register, me, forgetPassword, resetCodeCheck, resetPassword
}


