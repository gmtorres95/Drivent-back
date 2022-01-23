import { Router } from "express";

import * as controller from "@/controllers/client/ticket";

const router = Router();

router.get("/", controller.getTicketByUser);
router.put("/payment", controller.updateTicketPayment);
router.post("/booking/:roomId", controller.updateTicketBooking);

export default router;
