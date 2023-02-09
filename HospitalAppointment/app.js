import express from "express"
import dotenv from "dotenv"
import {router} from "./router/pageRouter.js";
import bodyParser from "body-parser";
import ejs from "ejs"
import jwt from "jsonwebtoken";
import mongoose from "mongoose"
import cookieParser from "cookie-parser";
import {dbConnection} from "./db.js";
import methodOverride from 'method-override';
const app=express();


//config
dotenv.config();
dbConnection();

//static dosya middleware
app.use(express.static("static"));

//ejs template
app.set("view engine","ejs");
app.use(express.json());//req.body için | gelen json verilerini okuyabilsin diye
app.use(express.urlencoded({extended:true}));
app.use(cookieParser())
app.use(
    methodOverride('_method', {
      methods: ['POST', 'GET'],
    })
  );

//router
app.use(router);

//server
app.listen(process.env.PORT,()=>{
    console.log("server is running.")
})