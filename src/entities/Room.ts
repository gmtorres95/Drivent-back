import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Hotel from "./Hotel";
import RoomType from "./RoomType";

@Entity("rooms")
export default class Room extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  number: string;

  @Column()
  hotelId: number;

  @Column()
  roomTypeId: number;

  @Column()
  bookings: number;

  @ManyToOne(() => Hotel, (hotel: Hotel) => hotel.rooms)
  @JoinColumn()
  hotel: Hotel;

  @ManyToOne(() => RoomType, (roomType: RoomType) => roomType.rooms)
  @JoinColumn()
  roomType: RoomType;
}
