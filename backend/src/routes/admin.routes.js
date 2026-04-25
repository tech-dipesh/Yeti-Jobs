import {Router} from "express";
import { adminDashBoard, assignUsersToCompanies, searchCompany, searchUsers, verifyAdminController } from "../controllers/admin.controllers.js";

const router = Router();

router.use("/verify", verifyAdminController)
router.get("/search/company", searchCompany);
router.get("/search/users", searchUsers);

router.post("/assign-user",  assignUsersToCompanies)
router.get("/dashboard", adminDashBoard)
export default router;