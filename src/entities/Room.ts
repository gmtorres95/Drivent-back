import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Hotel from "./Hotel";
import RoomType from "./RoomType";
import Ticket from "./Ticket";

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

  @ManyToOne(() => Hotel, (hotel: Hotel) => hotel.rooms)
  @JoinColumn()
  hotel: Hotel;

  @ManyToOne(() => RoomType, (roomType: RoomType) => roomType.rooms, { eager: true })
  @JoinColumn()
  roomType: RoomType;

  @OneToMany(() => Ticket, (ticket: Ticket) => ticket.room)
  tickets: Ticket[];

  getRoom() {
    return{
      id: this.id,
      number: this.number,
      bedsQuantity: this.roomType.bedsQuantity,
      bookings: this.tickets.length
    };
  }

  static async getListByHotelId(hotelId: number) {
    return await this.find({ where: { hotelId } });
  }
}
