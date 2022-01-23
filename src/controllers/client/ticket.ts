import { Request, Response } from "express";
import httpStatus from "http-status";

import * as service from "@/services/client/ticket";
import Ticket from "@/entities/Ticket";

export async function createTicket(req: Request, res: Response) {
  const ticketBody: Ticket = req.body;
  ticketBody.user = req.user.id;  
  await service.postTicket(ticketBody);
  res.sendStatus(httpStatus.CREATED);
}

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
