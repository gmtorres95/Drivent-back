import { Router } from "express";

import * as controller from "@/controllers/client/activity";

const router = Router();

router.get("/", controller.listActivities);
router.post("/:id", controller.subscribe);

export default router;
