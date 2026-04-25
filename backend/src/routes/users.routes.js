import {Router} from "express";
import { addUserSkills, getAllUserController, getloginUserController, getUserProfile, litOfAllFollowingCompanies, patchUserController, postSignupUserController, putUserController, resumeInformation, sendUserLoggedInStatus, UserEducationAdd, userLoggedOutcontroller } from "../controllers/users.controller.js";
import {uploadResume, uploadProfilePicture} from "../controllers/uploadResume.controller.js";
import authUserMiddleware from "../Middleware/isLoggedIn.js";
import verifyEmailConfirmation, { forgetEmailPassword, resendVerificationCode, verifyForgetPassword } from "../controllers/verifyCode.controller.js";
import rateLimit from "express-rate-limit";
import alreadyLoggedIn from "../Middleware/alreadyLoggedIn.js"
import isAdminMIddleware from "../Middleware/isAdmin.js";
import isUnverifiedUser from "../Middleware/isAuthButUnverified.js";
import isOwnerMiddleware from "../Middleware/isOwner.js"
import validateCorrectUid from '../Middleware/validateCorrectUid.js'
import upload from "../services/Multer.js"
import isJobSeeker from "../Middleware/isJobSeeker.js";
const limitUser=rateLimit({
  windowMs: 1000*60,
  limit: 2,
  message: {message:"You only can send resend request twice per minute"}
})

const router = Router();

router.get("/login-status", sendUserLoggedInStatus)
router.get("/logout", userLoggedOutcontroller);
router.post("/login", alreadyLoggedIn, getloginUserController);
router.post("/signup", alreadyLoggedIn, postSignupUserController);
router.get("/all", authUserMiddleware, isAdminMIddleware, getAllUserController)



router.post("/forget-password", limitUser, forgetEmailPassword)
router.post("/forget-password/verify", limitUser, verifyForgetPassword)
router.post("/verify", limitUser, isUnverifiedUser, verifyEmailConfirmation)
router.post("/verify/resend", limitUser, isUnverifiedUser, resendVerificationCode)

router.get("/following", authUserMiddleware,  isJobSeeker, litOfAllFollowingCompanies)

router.route("/resume")
.all(authUserMiddleware)
.get(resumeInformation)
.post(upload.single('resume'),  uploadResume)

router.post("/profile-picture", authUserMiddleware, isOwnerMiddleware("users"), upload.single('profile'),  uploadProfilePicture)

router.post("/add-education", authUserMiddleware, isOwnerMiddleware("users"), UserEducationAdd)

router.post("/:id/skills", validateCorrectUid, authUserMiddleware, isOwnerMiddleware("users"),  addUserSkills);

router.route("/:id")
.all(validateCorrectUid, authUserMiddleware, isOwnerMiddleware("users"))
.get(authUserMiddleware, getUserProfile)
.put(putUserController)
.patch(patchUserController)
export default router;