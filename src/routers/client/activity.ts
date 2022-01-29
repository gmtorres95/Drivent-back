import { Router } from "express";

import * as controller from "@/controllers/client/activity";

const router = Router();

router.post("/:id", controller.subscribe);
router.get("/", controller.getActivitiesFromTicket);

export default router;
