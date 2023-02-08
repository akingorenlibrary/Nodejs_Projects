import express from "express";
import {indexPageGet, validationPageGet, makeAppointmentGet, logout} from "../controller/pageController.js";
import {validationPagePost} from "../controller/validationController.js";
import {jwtControl} from "../authentication/jwt.js"; 
import {makeAppointmentPost, makeAppointmentControlPost} from "../controller/makeAppointmentController.js";

//Definition
const router=express.Router();

//Routes
router.route("/").get(indexPageGet);
router.route("/validation").get(validationPageGet).post(validationPagePost);
router.route("/makeAppointment").get(jwtControl,makeAppointmentGet).post(makeAppointmentPost)
router.route("/logout").get(logout)
router.route("/makeAppointment/control").post(makeAppointmentControlPost);

//Export
export {router};