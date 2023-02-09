import jwt from "jsonwebtoken";

const jwtControl=(req,res,next)=>{
    const token=req.cookies["jwt"]
    if(token)
    {
        jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {
            if(err){
                res.locals.user=null;
                return res.render("errorPage");
            }
            if(decoded)
            {
                res.locals.user=decoded.tc;
                next();
            }
        });

    }else{
        res.locals.user=null;
        return res.redirect("/")
    }

}

const otherControl=(req, res, next)=>{
    //jwt varsa anasayfa gitme
    const token=req.cookies["jwt"]
    if(token)
    {
        jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {
            if(err){
                res.locals.user=null;
                return res.render("errorPage");
            }
            if(decoded)
            {
                res.locals.user=decoded.tc;
                return res.redirect("/appointmentDetail")
            }
        });

    }else{
        next();
    }

}
export {jwtControl, otherControl};