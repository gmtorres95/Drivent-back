import { Request, Response } from "express";

import * as service from "@/services/client/ticket";

export async function getTicketByUser(req: Request, res: Response) {
  const userId = req.user.id;
  const ticket = await service.getTicketByUser(userId);
  res.send(ticket);
}

export async function updateTicketPayment(req: Request, res: Response) {
  const userId = req.user.id;
  const tickedPaid = await service.updateTicketPayment(userId);
  res.send(tickedPaid);
}

export async function updateTicketBooking(req: Request, res: Response) {
  const userId = req.user.id;
  const roomId = +req.params.roomId;
  const bookedTicket = await service.updateTicketBooking(userId, roomId);
  res.send(bookedTicket);
}
