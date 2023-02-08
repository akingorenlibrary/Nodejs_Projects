import jwt from "jsonwebtoken";

const jwtControl=(req,res,next)=>{
    const token=req.cookies["jwt"];
    if(token)
    {
        jwt.verify(token,process.env.JWT_SECRET_KEY,(err, decoded)=>{
            if(decoded)
            {
                res.locals.user=decoded.tc;
                req.session.userTc=decoded.tc;
                next();
            }
            else if(err)
            {
                res.locals.user=null;
                return res.redirect("/");
            }
        })
    }
    else
    {
        res.locals.user=null;
        return res.redirect("/");
    }
}

export {jwtControl};