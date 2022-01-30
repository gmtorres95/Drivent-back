import { Request, Response } from "express";
import * as service from "@/services/client/activityDate";

export async function getActivityDates(req: Request, res: Response) {
  const dates = await service.getActivityDates();
  res.send(dates);
}
