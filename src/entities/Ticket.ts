import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Room from "./Room";

@Entity("tickets")
export default class Ticket extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  isPaid: boolean;

  @Column({ nullable: true })
  roomId: number;

  @ManyToOne(() => Room, (room: Room) => room.tickets)
    @JoinColumn()
    room: Room;
}
