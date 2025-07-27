import express from 'express';
const router = express.Router();
import  authController from '../controllers/auth-controller.js';

// router.get("/",(req,res)=>{
//     res.status(200).send("Authentication Home Page using Express Router");
// })

router.route("/").get(authController.home);

router.route("/register").post(authController.register);

router.route("/login").post(authController.login);

export default router;