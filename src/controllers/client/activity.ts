import { Request, Response } from "express";
import httpStatus from "http-status";

import * as activityService from "@/services/client/activity";

export async function subscribe(req: Request, res: Response) {
  const userId = req.user.id;
  const activityId  = Number(req.params.id);
  await activityService.subscribe(userId, activityId);
  res.sendStatus(httpStatus.CREATED);
}
  
export async function getActivitiesFromTicket(req: Request, res: Response) {
  const userId = req.user.id;
  const tickets = await activityService.getActivitiesFromTicket(userId);
  res.send(tickets);
}
