import { Request, Response } from "express";
import httpStatus from "http-status";

import * as activityService from "@/services/client/activity";

export async function subscribe(req: Request, res: Response) {
  const userId = req.user.id;
  const activityId  = Number(req.params.id);
  await activityService.subscribe(userId, activityId);
  res.sendStatus(httpStatus.CREATED);
}

export async function listActivities(req: Request, res: Response) {
  const dateId = + req.params.dateId;
  const activities = await activityService.listPlaces(dateId);
  res.send(activities);
}

export async function unsubscribe(req: Request, res: Response) {
  const userId = req.user.id;
  const activityId  = Number(req.params.id);
  await activityService.unsubscribe(userId, activityId);
  res.sendStatus(httpStatus.OK);
}
