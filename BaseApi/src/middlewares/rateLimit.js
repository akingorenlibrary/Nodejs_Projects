const rateLimit = require('express-rate-limit');

const allowList=["127.0.0.1"]

const limiter = rateLimit({
	windowMs: 60 * 60 * 1000, // 60 minutes
	max:(req, res)=>{
        console.log("req.url: ",req.url);
        if(req.url=="/api/login" || req.url=="/api/register"){
            return 5;
        }else{
            return 50;
        }
    },
    message: {
        success: false,
        message: "Çok fazla istekte bulundunuz !. 1 Saat Engellendiniz."
    },
    skip:(req, res)=>{
        let temp=req.ip;
        //console.log("temp: ",temp.split(":")[3]);
        allowList.forEach(element=>{
            if(element==temp.split(":")[3]){
                return false;
            }
        })
        return true;
    },
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})


module.exports={limiter};