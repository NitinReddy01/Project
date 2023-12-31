import express from "express";
import loginController from "../controllers/auth/loginController";
import registerController from "../controllers/auth/registerController";
import logoutController from "../controllers/auth/logoutController";
import handleRefreshToken from "../controllers/auth/refreshController";
const router=express.Router();

router.post('/login',loginController);
router.post('/register',registerController);
router.get('/logout',logoutController);
router.get('/refreshToken',handleRefreshToken);

export default router;