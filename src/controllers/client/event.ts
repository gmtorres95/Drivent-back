import { Request, Response } from "express";

import * as service from "@/services/client/event";

export async function get(req: Request, res: Response) {
  const eventInfo = await service.getEventInfo();
  res.send(eventInfo);
}

export async function subscribe(req: Request, res: Response) {
  const userId = req.user.id;
  const activityId  = Number(req.params.id);
  await service.subscribe(userId, activityId);
}
