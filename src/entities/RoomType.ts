import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Room from "./Room";

@Entity("roomTypes")
export default class RoomType extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @Column()
  bedsQuantity: number;

  @OneToMany(() => Room, (room: Room) => room.roomType)
    rooms: Room[];
}
