import { Router } from "express";

import * as controller from "@/controllers/client/activityDate";

const router = Router();

router.get("/", controller.getActivityDates);

export default router;
