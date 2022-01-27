import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany, ManyToMany, JoinTable } from "typeorm";
import ActivityDate from "./ActivityDate";
import Place from "./Place";
import Ticket from "./Ticket";

@Entity("activities")
export default class Activity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    name: string;

    @ManyToOne(() => Place, (place) => place.activity, { eager: true })
    @JoinColumn({ name: "placeId" })
    place: Place;

    @Column({ type: "timestamp" })
    start: Date

    @Column({ type: "timestamp" })
    end: Date

    @ManyToOne(() => ActivityDate, (activitydate) => activitydate.activity, { eager: true })
    @JoinColumn({ name: "dateId" })
    Date: ActivityDate;

    @Column()
    totalOfSeats: number;

    @ManyToMany(() => Ticket, ticket => ticket.id, { eager: true })
    @JoinTable({
      name: "ticketActivities",
      joinColumn: {
        name: "activityId",
        referencedColumnName: "id"
      },
      inverseJoinColumn: {
        name: "ticketId",
        referencedColumnName: "id"
      }
    })
    ticket: Ticket[]
}
