const router=require("express").Router();

const authRouter=require("./auth.routes.js");
router.use(authRouter);

module.exports=router;