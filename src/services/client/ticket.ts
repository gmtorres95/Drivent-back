import Ticket from "@/entities/Ticket";

export async function getTicketByUser(userId: number) {
  const ticket = await Ticket.findOne({ where: { user: userId } });

  return ticket;
}

export async function updateTicket(userId: number) {
  const ticket = await getTicketByUser(userId);
  const tickedPaid = await Ticket.updateTicketPayment(ticket);

  return tickedPaid;
}
