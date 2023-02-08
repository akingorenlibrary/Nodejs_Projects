const indexPageGet=(req,res)=>{
    return res.status(200).render("index");
}

const validationPageGet=(req,res)=>{
    return res.render("validation");
}

const makeAppointmentGet=(req,res)=>{
    return res.render("makeAppointment");
}

const logout=(req,res)=>{
    res.cookie("jwt","",{maxAge:1});
    req.session.destroy();
    return res.redirect("/");
}


export {indexPageGet, validationPageGet, makeAppointmentGet, logout};