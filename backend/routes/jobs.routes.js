import express from "express"

import { deleteListingController, getAllListingController, getListingController, postListingController, putListingController, searchJobsListing, verifyOwnerController } from "../controllers/jobs.controller.js";
import isOwnwerMiddleware from "../Middleware/isLoggedIn.js";
import authUserMiddleware from "../Middleware/isLoggedIn.js";
import { getallSaveJob, storeSaveJob, unsaveListJob } from "../controllers/saveJobs.controller.js";
import isCompanyEmployee from "../Middleware/isCompanyEmployee.js";
import validateCorrectUid from "../Middleware/validateCorrectUid.js";
const router=express.Router();

router.get("/saved_jobs/list", authUserMiddleware, getallSaveJob);
router.post("/:id/bookmark_job", validateCorrectUid, authUserMiddleware,  storeSaveJob);
router.delete("/:id/remove_from_bookmark", validateCorrectUid, authUserMiddleware, isOwnwerMiddleware, unsaveListJob);

router.get("/", getAllListingController);
router.get("/search", searchJobsListing);

router.get("/:id", validateCorrectUid, authUserMiddleware, getListingController);
router.post("/new", authUserMiddleware,  isCompanyEmployee, postListingController);

router.delete("/:id/delete", validateCorrectUid, isOwnwerMiddleware, deleteListingController);

router.put("/:id/edit", validateCorrectUid, isOwnwerMiddleware, putListingController);
router.get("/:id/verify-owner", validateCorrectUid, authUserMiddleware, verifyOwnerController);
export default router;