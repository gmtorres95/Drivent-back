
import { BaseEntity, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import Activity from "./Activity";
import Ticket from "./Ticket";

@Entity("ticketActivities")
export default class TicketActivity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => Ticket, ticket => ticket.id, { eager: true })
    @JoinColumn({ name: "ticketId" })
    ticket: Ticket

    @ManyToOne(() => Activity, activity => activity.id, { eager: true })
    @JoinColumn({ name: "activityId" })
    activity: Activity
}
