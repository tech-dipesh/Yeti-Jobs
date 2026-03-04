import express from "express";
import bcrypt, { hash } from "bcryptjs";
import dataFetch from "../utils/tableDataFetch.js";
import { companyDashBoard, companyStatsController, deleteCompanyController, getallApplicationsList, getAllCompaniesList, getAllEmployeesList, getAllJobsList, getCompanyController, postCompanyController, putCompanyController } from "../controllers/companies.controller.js";
import isCompanyEmployee from "../Middleware/isCompanyEmployee.js";
import connect from "../db.js"
import validateCorrectUid from "../Middleware/validateCorrectUid.js";
import isAdminMIddleware from "../Middleware/isAdmin.js";

const router = express.Router();

router.get("/all", isCompanyEmployee, getAllCompaniesList);

router.route("/:id")
.get(validateCorrectUid, getCompanyController)
.delete( validateCorrectUid, isCompanyEmployee, deleteCompanyController)
.put(validateCorrectUid, isCompanyEmployee, putCompanyController)


router.post("/", postCompanyController);
router.get("/:id/dashboard", validateCorrectUid, isCompanyEmployee, companyDashBoard);

router.get("/:id/analytics", validateCorrectUid, isCompanyEmployee, companyStatsController)
router.get("/:id/employees", validateCorrectUid, isCompanyEmployee, getAllEmployeesList)
router.get("/:id/jobs", validateCorrectUid,  getAllJobsList)
router.get("/:id/applications", validateCorrectUid, isCompanyEmployee, getallApplicationsList)




export default router;