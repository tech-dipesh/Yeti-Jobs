import express from "express";
import { adminDashBoard, assignUsersToCompanies, searchCompany, searchUsers, verifyAdminController } from "../controllers/admin.controllers.js";
import isAdminMIddleware from "../Middleware/isAdmin.js";

const router = express.Router();

router.use("/verify",  verifyAdminController)
router.get("/search/company", isAdminMIddleware, searchCompany);
router.get("/search/users", isAdminMIddleware, searchUsers);

router.post("/assign-user", isAdminMIddleware,  assignUsersToCompanies)
router.get("/dashboard", isAdminMIddleware, adminDashBoard)
export default router;