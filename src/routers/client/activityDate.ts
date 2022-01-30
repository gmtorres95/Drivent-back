import { Router } from "express";

import * as controller from "@/controllers/client/activityDate";

const router = Router();

router.get("/", controller.getDays);

export default router;
