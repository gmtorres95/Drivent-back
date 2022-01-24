import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToOne, ManyToOne, JoinColumn } from "typeorm";
import TypeTicket from "./TypeTicket";
import Room from "./Room";
import NotFoundError from "@/errors/NotFoundError";
import RoomNotFound from "@/errors/RoomNotFound";
import CannotBookBeforePayment from "@/errors/CannotBookBeforePayment";
import User from "./User";
import UserAlreadyWithTicket from "@/errors/UserAlreadyWithTicket";
import InvalidTicketType from "@/errors/InvalidTicketType";

@Entity("tickets")
export default class Ticket extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "userId" })
  userId: number;

  @ManyToOne(() => TypeTicket, (type) => type.ticket, { eager: true })
  @JoinColumn({ name: "typeId" })
  type: TypeTicket;

  @Column({ type: "boolean", default: false })
  isPaid: boolean;

  @Column({ nullable: true })
  roomId: number;

  @OneToOne(() => User)
  @JoinColumn({ name: "userId" })
  user: User;

  @ManyToOne(() => Room, (room: Room) => room.tickets)
  @JoinColumn()
  room: Room;

  static async postTicket(ticket: Ticket) {
    const existentTicket = await this.getByUserId(ticket.userId);
    if(existentTicket) throw new UserAlreadyWithTicket;
    const validType = await TypeTicket.findOne( { where: { id: ticket.type } });
    if(!validType) throw new InvalidTicketType;
    const ticketCreated = this.create(ticket);
    await this.save(ticketCreated);
  }

  static async getByUserId(userId: number) {
    return await this.findOne({ where: { userId } });
  }

  static async updateTicketPayment(userId: number) {
    const ticket = await this.findOne({ where: { userId } });

    if(!ticket) throw new NotFoundError;

    ticket.isPaid = true;
    const ticketPaid = this.create(ticket);
    await ticketPaid.save();
    return ticketPaid;
  }

  static async updateTicketBooking(userId: number, roomId: number) {
    const ticket = await this.findOne({ where: { userId } });
    if(!ticket) throw new NotFoundError;
    if(!ticket.isPaid) throw new CannotBookBeforePayment;

    const room = await Room.findOne({ where: { id: roomId } });
    if(!room) throw new RoomNotFound;

    ticket.roomId = roomId;
    const updatedTicket = this.create(ticket);
    await updatedTicket.save();
    return updatedTicket;
  }
}
