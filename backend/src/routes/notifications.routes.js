import {Router} from "express";
import {sendUserNotifications, ReadAllNotifications, showAllNotifications} from '../controllers/notifications.controller.js';
const router = Router();

import validateCorrectUid from "../Middleware/validateCorrectUid.js";
router.get("/all",showAllNotifications)

router.patch("/read-all", ReadAllNotifications)
router.post("/:id", validateCorrectUid, sendUserNotifications)



export default router;
