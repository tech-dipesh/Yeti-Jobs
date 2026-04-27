import {Router} from "express"

import { deleteJobsController, getAllJobsController, getJobsController, postJobsController, putJobsController, searchJobsListing, verifyOwnerController } from "../controllers/jobs.controller.js";
import isOwnwerMiddleware from "../Middleware/isOwner.js";
import authUserMiddleware from "../Middleware/isLoggedIn.js";
import { getallSaveJob, storeSaveJob, unsaveListJob } from "../controllers/saveJobs.controller.js";
import isCompanyEmployee from "../Middleware/isCompanyEmployee.js";
import validateCorrectUid from "../Middleware/validateCorrectUid.js";
import isJobSeeker from "../Middleware/isJobSeeker.js"
const router=Router();

router.get("/", getAllJobsController);
router.get("/search", authUserMiddleware, searchJobsListing);

router.post("/new", authUserMiddleware,  isCompanyEmployee, postJobsController);

router.get("/saved_jobs/list", authUserMiddleware, isJobSeeker, getallSaveJob);
router.post("/:id/bookmark_job", validateCorrectUid, authUserMiddleware, isJobSeeker, storeSaveJob);
router.delete("/:id/remove_from_bookmark", validateCorrectUid, authUserMiddleware, isJobSeeker, isOwnwerMiddleware('jobs'), unsaveListJob);

router.delete("/:id/delete", validateCorrectUid, authUserMiddleware, isOwnwerMiddleware('jobs'), deleteJobsController);

router.put("/:id/edit", validateCorrectUid, authUserMiddleware, isOwnwerMiddleware('jobs'), putJobsController);
router.get("/:id/verify-owner", validateCorrectUid, authUserMiddleware, verifyOwnerController);

router.get("/:id", validateCorrectUid, authUserMiddleware, getJobsController);

export default router;