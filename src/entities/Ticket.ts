import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToOne, ManyToOne, JoinColumn } from "typeorm";
import TypeTicket from "./TypeTicket";
import User from "./User";

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
}

