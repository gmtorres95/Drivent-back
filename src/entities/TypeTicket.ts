import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import Ticket from "./Ticket";

@Entity("ticketTypes")
export default class TypeTicket extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  price: number;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  hotelPrice: number;

  @OneToMany(() => Ticket, (ticket) => ticket.type)
  ticket: Ticket;
}
