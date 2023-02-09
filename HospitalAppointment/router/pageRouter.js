import express from "express"
import {indexPage, errorPage, notFoundPage, validationPage, makeAppointmentPage, logoutPage, appointmentDetailPage} from "../controller/pageController.js"
import {validationControl} from "../controller/validationController.js"
import {jwtControl} from "../middilewares/jwt.js";
import {addAppointment, appointmentQuery, appointmentCardDetail, appointmentDelete} from "../controller/appointmentController.js";
import {otherControl} from "../middilewares/jwt.js";
const router=express.Router();

router.route("/").get(otherControl, indexPage)
router.route("/validation").get(otherControl, validationPage).post(otherControl, validationControl)
router.route("/makeAppointment").get(jwtControl, makeAppointmentPage).post(jwtControl, addAppointment)
router.route("/logout").get(jwtControl, logoutPage)
router.route("/appointmentDetail").get(jwtControl, appointmentDetailPage)
router.route("/appointmentQuery").post(jwtControl, appointmentQuery)
router.route("/appointmentCardDetail").post(jwtControl, appointmentCardDetail);
router.route("/appointmentDelete").post(jwtControl, appointmentDelete);
//router.route("/addMoreAppointment").post(jwtControl, addMoreAppointment);;
router.route("*").get(notFoundPage)
export {router};