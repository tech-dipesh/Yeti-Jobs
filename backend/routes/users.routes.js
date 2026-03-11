import path from "path"

import express from "express";
import { addUserSkills, deleteUserController, getAllUserController, getloginUserController, getParticularUserController, patchUserController, postSignupUserController, putUserController, sendUserLoggedInStatus, userLoggedOutcontroller } from "../controllers/users.controller.js";
import {uploadResume, uploadProfilePicture} from "../controllers/uploadResume.controller.js";
import multer from "multer";
import authUserMiddleware from "../Middleware/isLoggedIn.js";
import verifyEmailConfirmation, { forgetEmailPassword, resendVerificationCode, verifyForgetPassword } from "../controllers/verifyCode.controller.js";
import rateLimit from "express-rate-limit";
import alreadyLoggedIn from "../Middleware/alreadyLoggedIn.js"
import isAdminMIddleware from "../Middleware/isAdmin.js";
import isUnverifiedUser from "../Middleware/isAuthButUnverified .js";
import isOwnerMiddleware from "../Middleware/isOwner.js"
import validateCorrectUid from '../Middleware/validateCorrectUid.js'
import upload from "../services/Multer.js"
import { error } from "console";
const limitUser=rateLimit({
  windowMs: 1000*60,
  limit: 2,
  message: {message:"You only can send resend request once per minute"}
})

const router = express.Router();

router.get("/", authUserMiddleware, sendUserLoggedInStatus)
router.get("/logout", userLoggedOutcontroller);

router.post("/login", alreadyLoggedIn, getloginUserController);
router.post("/signup", alreadyLoggedIn, postSignupUserController);
router.get("/all", authUserMiddleware, isAdminMIddleware, getAllUserController)

router.get("/:id", validateCorrectUid, authUserMiddleware, isOwnerMiddleware,  getParticularUserController);


router.post("/:id/skills", validateCorrectUid, authUserMiddleware,  addUserSkills);

router.delete("/:id", validateCorrectUid, deleteUserController);
router.put("/:id", validateCorrectUid, putUserController);


// const ALLOWED_BODY = ['fname', 'lname', 'education', 'email', 'password'];

router.patch("/:id", validateCorrectUid, patchUserController)

router.post("/forget-password", limitUser, forgetEmailPassword)
router.post("/forget-password/verify", limitUser, verifyForgetPassword)
router.post("/verify", isUnverifiedUser, verifyEmailConfirmation)
router.post("/verify/resend", limitUser, isUnverifiedUser, resendVerificationCode)



router.post("/resume", upload.single('resume'), authUserMiddleware,  uploadResume)
router.post("/profile-picture", upload.single('profile'), authUserMiddleware,  uploadProfilePicture)
export default router;