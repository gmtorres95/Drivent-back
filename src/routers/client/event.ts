import { Router } from "express";

import * as controller from "@/controllers/client/event";

const router = Router();

router.get("/", controller.get);
router.subscribe("/subscribe/:id", controller.subscribe);

export default router;
