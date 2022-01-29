import { Request, Response } from "express";
import * as service from "@/services/client/activityDate";

export async function getDays(req: Request, res: Response) {
  const dates = await service.getDays();
  res.send(dates);
}
