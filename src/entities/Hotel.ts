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

    function listRoomTypes(rooms: Room[]) {
      const typeArray = rooms.map((room) => room.roomType.type);
      const hashtable: Record<string, unknown> = {};
      return typeArray.filter((type) => {
        if(hashtable[type] === undefined) {
          hashtable[type] = true;
          return true;
        }
        return false;
      });
    }

    return{
      id: this.id,
      image: this.image,
      name: this.name,
      totalOfBeds: this.totalOfBeds,
      unavailableBeds: calculateUnavailableBeds(this.rooms),
      roomTypes: listRoomTypes(this.rooms)
    };
  }

  static async listHotels() {
    return await this.find({ relations: ["rooms"], order: { id: "ASC" } });
  }
}
