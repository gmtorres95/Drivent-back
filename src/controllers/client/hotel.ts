import { Request, Response } from "express";
import httpStatus from "http-status";

import * as hotelService from "@/services/client/hotel";

export async function getListOfRooms(req: Request, res: Response) {
  const listOfRooms = await hotelService.getListOfHotels();

  if(!listOfRooms) {
    return res.sendStatus(httpStatus.NO_CONTENT);
  }
  
  res.send(listOfRooms).status(httpStatus.OK);
}
