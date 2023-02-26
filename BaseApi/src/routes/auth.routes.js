const router=require("express").Router();
const authValidation=require("../middlewares/validations/auth.validation.js");
const {register, login, me, forgetPassword, resetCodeCheck, resetPassword}=require("../controllers/auth.controller.js");
const {tokenCheck}=require("../middlewares/auth.js");

router.route("/login").post(authValidation.login, login);
router.route("/register").post(authValidation.register,register);
router.route("/me").get(tokenCheck, me);
router.route("/forget-password").post(forgetPassword)
router.route("/reset-code-check").post(resetCodeCheck)
router.route("/reset-password").post(resetPassword)
module.exports=router;