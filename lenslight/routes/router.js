import express from "express";
import {getIndexPage} from "../controller/indexController.js";
import {postPhotosPage, getPhotosPage, getPhotoPage, photoDelete, photoUpdate} from "../controller/photoController.js";
import {getRegisterPage, postRegisterPage} from "../controller/registerController.js";
import {getLoginPage, postLoginPage} from "../controller/loginController.js";
import {authMiddilwareToken} from "../middilewares/authMiddilware.js";
import {getDashboard,getLogout} from "../controller/dashboardController.js";
import {getUsersPage, getUserPage, follow, unfollow} from "../controller/usersController.js";
import {getContactPage, postContactPage} from "../controller/contactController.js";

const router=express.Router();

router.route("/").get(getIndexPage);
router.route("/photos").post(authMiddilwareToken,postPhotosPage).get(getPhotosPage);
router.route("/photo/:id").get(getPhotoPage)
router.route("/register").get(getRegisterPage).post(postRegisterPage);
router.route("/login").get(getLoginPage).post(postLoginPage);
router.route("/dashboard").get(authMiddilwareToken, getDashboard);
router.route("/logout").get(getLogout);
router.route("/users").get(authMiddilwareToken,getUsersPage);
router.route("/user/:id/follow").put(follow);
router.route("/user/:id/unfollow").put(unfollow);
router.route("/user/:id").get(authMiddilwareToken, getUserPage);
router.route("/photo/delete/:id").delete(photoDelete);
router.route("/photo/update/:id").put(photoUpdate);
router.route("/contact").get(getContactPage).post(postContactPage);
export {router};