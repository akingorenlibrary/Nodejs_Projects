import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import methodoverride from "method-override";
import db_connect_function from "./db.js";
import { router } from "./routes/router.js"
import {UserToken} from "./middilewares/authMiddilware.js";
import fileupload from "express-fileupload";
import {v2 as cloudinary} from "cloudinary";
import {getNotFoundPage} from "./controller/notFoundController.js";

dotenv.config();

cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.CLOUD_API_KEY,
    api_secret:process.env.CLOUD_API_SECRET
});


db_connect_function();

const app=express();
const port=process.env.PORT;

//ejs template
app.set("view engine","ejs");

//static dosya middleware
app.use(express.static("public"));
app.use(express.json());//req.body için | gelen json verilerini okuyabilsin diye
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(fileupload({useTempFiles:true}));
app.use(methodoverride("_method",{
    methods:["POST", "GET"]
}));

app.use("*",UserToken);
app.use(router);
app.use("*",getNotFoundPage);

app.listen(port,()=>{
    console.log("Server running.")
})