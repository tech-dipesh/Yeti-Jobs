import {Router} from "express";
import {sendUserNotifications, ReadAllNotifications, ReadUnreadSingleNotifications, showAllNotifications} from '../controllers/notifications.controller.js';

import validateCorrectUid from "../Middleware/validateCorrectUid.js";
const router = Router();

router.get("/all",showAllNotifications)
router.patch("/read-all", ReadAllNotifications)
router.post("/:id", validateCorrectUid, sendUserNotifications)
router.patch("/:id/read", validateCorrectUid, ReadUnreadSingleNotifications)

export default router;
