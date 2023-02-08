import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import session from "express-session";
import cookieParser from "cookie-parser";
import {dbConnection} from "./db.js";
import {router} from "./routes/router.js";

//Definition
const app=express();

//Config
dotenv.config();
app.use(session({ 
    cookie: {
         maxAge: 3600000 //1 hours
     },
    resave:true,
    secret:process.env.SESSION_SECRET_KEY,
    saveUninitialized:true
}));



//Database
dbConnection();


app.use(express.static('public'))
app.set("view engine","ejs");
app.use(express.json());
app.use(cookieParser());

//Router
app.use(router);
app.get("*",(req,res)=>{
    res.status(404).send("Page Not Found");
});

//Server
app.listen(process.env.PORT,()=>{
    console.log("Server is running.");
});