import { Request, Response } from "express";
import httpStatus from "http-status";

import * as roomService from "@/services/client/room";

export async function getListOfRooms(req: Request, res: Response) {
  const hotelId = +req.params.hotelId;
  const listOfRooms = await roomService.getListByHotelId(hotelId);

  if(!listOfRooms) {
    return res.sendStatus(httpStatus.NO_CONTENT);
  }
  
  res.send(listOfRooms).status(httpStatus.OK);
}
