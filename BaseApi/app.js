const express=require("express");
const app=express();
const mongoSanitize = require('express-mongo-sanitize');
const {limiter}=require("./src/middlewares/rateLimit.js");
require("dotenv").config();
require("./src/db/dbConnection.js");
const port=process.env.PORT || 5001;
const momentTimeZone=require("moment-timezone");
momentTimeZone.tz.setDefault("Europe/Istanbul");

app.get("/",(req, res)=>{
    res.send("ok");
});

app.use(
    mongoSanitize({
      replaceWith: '_',
    }),
);
  
app.use(limiter);
app.use(express.json());
app.use(express.json({limit:"50mb"}));
app.use(express.urlencoded({limit:"50mb",extended:true, parameterLimit:50000}));

const router= require("./src/routes");
app.use("/api",router);

app.listen(port,()=>{
    console.log(`Server ${port} is running.`);
}); 