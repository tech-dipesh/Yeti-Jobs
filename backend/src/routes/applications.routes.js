import {Router} from "express";
import isLoggedInMiddleware from "../Middleware/isLoggedIn.js"
import { allAppliedJobs, applyJobApplicationController, changeApplicationStatus, particularJobsListController, withdrawJobApplicationController } from "../controllers/applications.controller.js";
import isCompanyEmployee from "../Middleware/isCompanyEmployee.js";
import validateCorrectUid from "../Middleware/validateCorrectUid.js"
import isJobSeeker from "../Middleware/isJobSeeker.js"
const router = Router({mergeParams: true});
import isOwnerMiddleware from "../Middleware/isOwner.js"

router.get("/applylist", isLoggedInMiddleware, allAppliedJobs)

router.get("/:id/applist", validateCorrectUid, isOwnerMiddleware("applications"), isCompanyEmployee, particularJobsListController)
router.post("/:id/apply", validateCorrectUid, isLoggedInMiddleware, isJobSeeker, applyJobApplicationController)
router.post("/:id/status", validateCorrectUid, isLoggedInMiddleware, isCompanyEmployee, changeApplicationStatus)
  
router.delete("/:id/withdraw", validateCorrectUid, isLoggedInMiddleware, withdrawJobApplicationController, )


export default router;