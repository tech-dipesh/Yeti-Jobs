import express from "express";
import bcrypt, { hash } from "bcryptjs";
import dataFetch from "../utils/tableDataFetch.js";
import { companyDashBoard, companyStatsController, deleteCompanyController, followCompany, getallApplicationsList, getAllCompaniesFollowers, getAllCompaniesList, getAllEmployeesList, getAllJobsList, getCompanyController, postCompanyController, putCompanyController, unFollowCompany} from "../controllers/companies.controller.js";
import isCompanyEmployee from "../Middleware/isCompanyEmployee.js";
import connect from "../db.js"
import validateCorrectUid from "../Middleware/validateCorrectUid.js";
import isAdminMIddleware from "../Middleware/isAdmin.js";
import upload from "../services/Multer.js";
import isJobSeeker from "../Middleware/isJobSeeker.js";

const router = express.Router();

router.get("/all", getAllCompaniesList);
router.post("/new", upload.single("company_logo"), postCompanyController);
router.get("/dashboard", isCompanyEmployee, companyDashBoard);
router.get("/followers", isCompanyEmployee, getAllCompaniesFollowers);

router.route("/:id")
.get(validateCorrectUid, getCompanyController)
.delete( validateCorrectUid, isCompanyEmployee, deleteCompanyController)
.put(validateCorrectUid, isCompanyEmployee, putCompanyController)

router.route("/:id/follow")
.post(validateCorrectUid, isJobSeeker, followCompany)
.delete(validateCorrectUid, isJobSeeker, unFollowCompany)

router.get("/:id/analytics", validateCorrectUid, isCompanyEmployee, companyStatsController)
router.get("/:id/employees", validateCorrectUid, isCompanyEmployee, getAllEmployeesList)
router.get("/:id/jobs", validateCorrectUid,  getAllJobsList)
router.get("/:id/applications", validateCorrectUid, isCompanyEmployee, getallApplicationsList)




export default router;