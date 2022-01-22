import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToOne, ManyToOne, JoinColumn } from "typeorm";
import TypeTicket from "./TypeTicket";
import User from "./User";
import Room from "./Room";

@Entity("tickets")
export default class Ticket extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User)
  @JoinColumn({ name: "userId" })
  user: User;

  @ManyToOne(() => TypeTicket, (type) => type.ticket, { eager: true })
  @JoinColumn({ name: "typeId" })
  type: TypeTicket;

  @Column({ type: "boolean", default: false })
  isPaid: boolean;

  @Column({ nullable: true })
  roomId: number;

  @ManyToOne(() => Room, (room: Room) => room.tickets)
  @JoinColumn()
  room: Room;

  static async updateTicketPayment(ticket: Ticket) {
    ticket.isPaid = true;
    const ticketPaid = this.create(ticket);
    await ticketPaid.save();
    return ticketPaid;
  }
}

