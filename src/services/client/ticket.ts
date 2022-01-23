import Ticket from "@/entities/Ticket";

export async function getTicketByUser(userId: number) {
  return await Ticket.getByUserId(userId);
}

export async function updateTicketPayment(userId: number) {
  return await Ticket.updateTicketPayment(userId);
}
