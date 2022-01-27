import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import ActivityDate from "./ActivityDate";
import Place from "./Place";
import TicketActivity from "./TicketActivity";

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

    @OneToMany(() => TicketActivity, ticketActivity => ticketActivity.activity)
    ticketActivity: TicketActivity
}
