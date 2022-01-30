import EventIsFull from "@/errors/EventIsFull";
import NotFoundError from "@/errors/NotFoundError";
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, ManyToMany, JoinTable } from "typeorm";
import ActivityDate from "./ActivityDate";
import Place from "./Place";
import Ticket from "./Ticket";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import ConflictInTimeActivity from "@/errors/ConflictInTimeActivity";
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

    @ManyToMany(() => Ticket, ticket => ticket.id)
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
    tickets: Ticket[];

    static async subscribe(userId: number, activityId: number) {
      const activity = await this.findOne( { where: { id: activityId } });
      if(!activity) throw new NotFoundError;
      const ticket = await Ticket.findOne( { where: { userId: userId } });
      const AllActivities = ticket.activities;
      const userActivities = AllActivities.filter((act) => act.Date.id === activity.Date.id);
      const validationTime = this.checkTimeValidation(activity.start, userActivities);
      if(!validationTime) throw new ConflictInTimeActivity;
      if(activity.totalOfSeats <= 0) throw new EventIsFull;
      activity.totalOfSeats = activity.totalOfSeats - 1;
      activity.save();
      ticket.activities.push(activity);
      ticket.save();
    }

    static checkTimeValidation( startTimeActivity: Date, userActivities: Activity[] ) {
      dayjs().locale("pt-br");
      const date1 = dayjs(startTimeActivity);
      const diffs = userActivities.map((activity) => {
        const date2 = dayjs(activity.end);
        return date1.diff(date2, "hours");
      });
      const validation = diffs.filter( (e) => e < 0);
      if(validation.length) {
        return false;
      }
      else{
        return true;
      }
    }
}
