import Ticket from "@/entities/Ticket";

export async function getTicketByUser(userId: number) {
  const ticket = await Ticket.findOne({ where: { user: userId } });

  return ticket;
}
