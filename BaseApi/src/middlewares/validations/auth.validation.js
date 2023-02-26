const joi=require("joi");
const {Response}=require("../../utils/response.js");

class authValidation{
    constructor(){}
    static register=async(req,res,next)=>{
        try{
            await joi.object({
                name:joi.string().trim().min(3).max(100).required().messages({
                    "string.base":"İsim alanı metin olamalıdır.",
                    "string.empty":"İsim alanı boş bırakılamaz.",
                    "string.min":"İsim alanı min 3 karakter olmalıdır.",
                    "string.max":"İsim alanı max 100 karakter olmalıdır.",
                    "string.required":"İsim alanı zorunludur."
                }),
                lastname:joi.string().trim().min(3).max(6).required().messages({
                    "string.base":"Soyisim alanı metin olamalıdır.",
                    "string.empty":"Soyisim alanı boş bırakılamaz.",
                    "string.min":"Soyisim alanı min 3 karakter olmalıdır.",
                    "string.max":"Soyisim alanı max 100 karakter olmalıdır.",
                    "string.required":"Soyisim alanı zorunludur."
                }),
                password:joi.string().trim().min(6).max(36).required().messages({
                    "string.base":"Şifre alanı metin olamalıdır.",
                    "string.empty":"Şifre alanı boş bırakılamaz.",
                    "string.min":"Şifre alanı min 6 karakter olmalıdır.",
                    "string.max":"Şifre alanı max 36 karakter olmalıdır.",
                    "string.required":"Şifre alanı zorunludur."
                }),
                email:joi.string().email().trim().min(3).max(100).required().messages({
                    "string.base":"Email alanı metin olamalıdır.",
                    "string.empty":"Email alanı boş bırakılamaz.",
                    "string.min":"Email alanı min 3 karakter olmalıdır.",
                    "string.max":"Email alanı max 100 karakter olmalıdır.",
                    "string.email": "Lütfen Geçerli Bir Email Giriniz",
                    "string.required":"Email alanı zorunludur."
                }),
            }).validateAsync(req.body)
        }catch(error){
             //console.log(error);
             //console.log(error.details[0].message);
             return new Response(error.details[0].message,"Hata oluştu").error400(res);
        }
        next()
    }

    static login=async(req,res,next)=>{
        try{
            await joi.object({
                password:joi.string().trim().min(6).max(36).required().messages({
                    "string.base":"Şifre alanı metin olamalıdır.",
                    "string.empty":"Şifre alanı boş bırakılamaz.",
                    "string.min":"Şifre alanı min 6 karakter olmalıdır.",
                    "string.max":"Şifre alanı max 36 karakter olmalıdır.",
                    "string.required":"Şifre alanı zorunludur."
                }),
                email:joi.string().email().trim().min(3).max(100).required().messages({
                    "string.base":"Email alanı metin olamalıdır.",
                    "string.empty":"Email alanı boş bırakılamaz.",
                    "string.min":"Email alanı min 3 karakter olmalıdır.",
                    "string.max":"Email alanı max 100 karakter olmalıdır.",
                    "string.email": "Lütfen Geçerli Bir Email Giriniz",
                    "string.required":"Email alanı zorunludur."
                })
            }).validateAsync(req.body)
        }catch(error){
            //console.log(error);
             return new Response(error.details[0].message,"Hata oluştu").error400(res);
        }
        next()
    }
}

module.exports=authValidation;