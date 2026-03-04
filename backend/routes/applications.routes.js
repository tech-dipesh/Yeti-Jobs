import express from "express"
import isAdminMIddleware from "../Middleware/isAdmin.js"
import isLoggedInMiddleware from "../Middleware/isLoggedIn.js"
import tableDataFetch from "../utils/tableDataFetch.js"
import connect from "../db.js"
import applicationSchema from "../Models/applications.models.js";
import { allAppliedJobs, applyJobApplicationController, particularJobsListController, withdrawJobApplicationController } from "../controllers/applications.controller.js";
import isCompanyEmployee from "../Middleware/isCompanyEmployee.js";
import validateCorrectUid from "../Middleware/validateCorrectUid.js"
import isJobSeeker from "../Middleware/isJobSeeker.js"
const router = express.Router();
import isOwnerMiddleware from "../Middleware/isOwner.js"

  
  router.get("/applylist", isLoggedInMiddleware, allAppliedJobs)
  
  router.get("/:id/applist", isOwnerMiddleware, isCompanyEmployee, particularJobsListController)
  router.post("/:id/apply", validateCorrectUid, isLoggedInMiddleware, isJobSeeker, applyJobApplicationController)
  
router.delete("/:id/withdraw", validateCorrectUid, isLoggedInMiddleware, withdrawJobApplicationController, )


export default router;