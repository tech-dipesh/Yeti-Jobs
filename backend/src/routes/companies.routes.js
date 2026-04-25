import {Router} from "express";
import { companyDashBoard, deleteCompanyController, followCompany, getallApplicationsList, getAllCompaniesFollowers, getAllCompaniesList, getAllEmployeesList, getAllJobsList, getCompanyController, postCompanyController, putCompanyController, unFollowCompany} from "../controllers/companies.controller.js";
import isCompanyEmployee from "../Middleware/isCompanyEmployee.js";
import validateCorrectUid from "../Middleware/validateCorrectUid.js";
import upload from "../services/Multer.js";
import isJobSeeker from "../Middleware/isJobSeeker.js";
import isOwnerMiddleware from "../Middleware/isOwner.js"

const router = Router();

router.get("/all", getAllCompaniesList);
router.post("/new", upload.single("company_logo"),  postCompanyController);
router.get("/dashboard", isCompanyEmployee, companyDashBoard);
router.get("/followers", isCompanyEmployee, getAllCompaniesFollowers);

router.route("/:id")
.all(validateCorrectUid, )
.get(getCompanyController, isOwnerMiddleware("companies"))
.delete(isCompanyEmployee, deleteCompanyController)
.put(isCompanyEmployee, putCompanyController)

router.route("/:id/follow")
.all(validateCorrectUid, isJobSeeker)
.post(followCompany)
.delete(unFollowCompany)

router.use("/:id", validateCorrectUid, isOwnerMiddleware("companies")); 
router.get("/:id/employees", isCompanyEmployee, getAllEmployeesList);
router.get("/:id/jobs", getAllJobsList);
router.get("/:id/applications", isCompanyEmployee, getallApplicationsList);

export default router;