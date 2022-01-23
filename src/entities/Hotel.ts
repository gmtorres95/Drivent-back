import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Room from "./Room";

@Entity("hotels")
export default class Hotel extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  image: string;

  @Column()
  name: string;

  @Column()
  totalOfBeds: number;

  @OneToMany(() => Room, (room: Room) => room.hotel)
  rooms: Room[];

  getHotel() {
    function calculateUnavailableBeds(rooms: Room[]) {
      const bookings = rooms.map((room) => room.tickets.length);
      return bookings.reduce((total, numero) => total + numero);
    }

    return{
      id: this.id,
      image: this.image,
      name: this.name,
      totalOfBeds: this.totalOfBeds,
      unavailableBeds: calculateUnavailableBeds(this.rooms)
    };
  }

  static async listHotels() {
    return await this.find({ relations: ["rooms"], order: { id: "ASC" } });
  }
}
