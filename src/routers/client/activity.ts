import { Router } from "express";

import * as controller from "@/controllers/client/activity";

const router = Router();

router.get("/:dateId", controller.listActivities);
router.post("/:id", controller.subscribe);
router.put("/:id", controller.unsubscribe);

export default router;
