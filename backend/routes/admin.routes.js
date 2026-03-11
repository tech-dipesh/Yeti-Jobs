
import express from "express";
import { assignUsersToCompanies, searchCompany, searchUsers, verifyAdminController } from "../controllers/admin.controllers.js";
import isAdminMIddleware from "../Middleware/isAdmin.js";

const router = express.Router();

router.use("/verify",  verifyAdminController)
router.get("/search/company", isAdminMIddleware, searchCompany);
router.get("/search/users", isAdminMIddleware, searchUsers);

router.post("/assign-user",  assignUsersToCompanies)

export default router;