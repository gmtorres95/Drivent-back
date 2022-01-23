import { Router } from "express";

import * as controller from "@/controllers/client/ticket";

const router = Router();

router.get("/payment", controller.getTicketByUser);
router.put("/payment", controller.updateTicketPayment);

export default router;
