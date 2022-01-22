import { Request, Response } from "express";

import * as service from "@/services/client/ticket";

export async function getTicketByUser(req: Request, res: Response) {
  const { userId } = req.body;
  const eventInfo = await service.getTicketByUser(userId);
  res.send(eventInfo);
}
