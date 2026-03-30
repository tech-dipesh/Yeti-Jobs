import express from "express"

import { deleteJobsController, getAllJobsController, getJobsController, postJobsController, putJobsController, searchJobsListing, verifyOwnerController } from "../controllers/jobs.controller.js";
import isOwnwerMiddleware from "../Middleware/isLoggedIn.js";
import authUserMiddleware from "../Middleware/isLoggedIn.js";
import { getallSaveJob, storeSaveJob, unsaveListJob } from "../controllers/saveJobs.controller.js";
import isCompanyEmployee from "../Middleware/isCompanyEmployee.js";
import validateCorrectUid from "../Middleware/validateCorrectUid.js";
import isJobSeeker from "../Middleware/isJobSeeker.js"
const router=express.Router();

router.get("/saved_jobs/list", authUserMiddleware, isJobSeeker, getallSaveJob);
router.post("/:id/bookmark_job", validateCorrectUid, authUserMiddleware, isJobSeeker, storeSaveJob);
router.delete("/:id/remove_from_bookmark", validateCorrectUid, authUserMiddleware, isJobSeeker, isOwnwerMiddleware, unsaveListJob);

router.get("/", getAllJobsController);
router.get("/search", searchJobsListing);

router.get("/:id", validateCorrectUid, authUserMiddleware, getJobsController);
router.post("/new", authUserMiddleware,  isCompanyEmployee, postJobsController);

router.delete("/:id/delete", validateCorrectUid, isOwnwerMiddleware, deleteJobsController);

router.put("/:id/edit", validateCorrectUid, isOwnwerMiddleware, putJobsController);
router.get("/:id/verify-owner", validateCorrectUid, authUserMiddleware, verifyOwnerController);
export default router;