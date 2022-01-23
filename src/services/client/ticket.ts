import Ticket from "@/entities/Ticket";

export async function postTicket(ticket: Ticket) {
  await Ticket.postTicket(ticket);
}

export async function getTicketByUser(userId: number) {
  return await Ticket.getByUserId(userId);
}

export async function updateTicketPayment(userId: number) {
  return await Ticket.updateTicketPayment(userId);
}

export async function updateTicketBooking(userId: number, roomId: number) {
  return await Ticket.updateTicketBooking(userId, roomId);
}
