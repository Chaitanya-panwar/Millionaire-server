import express from "express";
import {
	login,
	logout,
	signup,
	verifyEmail,
	forgotPassword,
	resetPassword,
	checkAuth,
	updateInfo,
	getInfo,
	addfund,
	getFund,
	addwithdrawal,
	getWithdrawal,
	deleteFund,
	deleteWithdrawal,
	updateFund,
	updateWithdrawal,
} from "../controllers/auth.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/check-auth", verifyToken, checkAuth);


router.post("/signup", signup);
router.get("/signup",getInfo);
router.put("/signup/:id",updateInfo);

router.post("/login", login);
router.post("/logout", logout);

router.post("/verify-email", verifyEmail);
router.post("/forgot-password", forgotPassword);

router.post("/reset-password/:token", resetPassword);

router.post("/fund",addfund);
router.get("/fund",getFund);
router.put("/fund/:id",updateFund);
router.delete("/fund/:id",deleteFund);

router.post("/withdrawal",addwithdrawal);
router.get("/withdrawal",getWithdrawal);
router.put("/withdrawal/:id",updateWithdrawal);
router.delete("/withdrawal/:id",deleteWithdrawal);


export default router;
