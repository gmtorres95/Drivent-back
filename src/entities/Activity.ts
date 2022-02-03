import EventIsFull from "@/errors/EventIsFull";
import NotFoundError from "@/errors/NotFoundError";
import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from "typeorm";
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

  @ManyToOne(() => Place, (place) => place.activities, { eager: true })
  @JoinColumn({ name: "placeId" })
  place: Place;

  @Column({ type: "timestamp" })
  start: Date;

  @Column({ type: "timestamp" })
  end: Date;

  @Column()
  dateId: number;

  @Column()
  placeId: number;

  @ManyToOne(() => ActivityDate, (activitydate) => activitydate.activity, {
    eager: true,
  })
  @JoinColumn({ name: "dateId" })
  date: ActivityDate;

  @Column()
  totalOfSeats: number;

  @ManyToMany(() => Ticket, (ticket) => ticket.id)
  @JoinTable({
    name: "ticketActivities",
    joinColumn: {
      name: "activityId",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "ticketId",
      referencedColumnName: "id",
    },
  })
  tickets: Ticket[];

  static async subscribe(userId: number, activityId: number) {
    const activity = await this.findOne({ where: { id: activityId }, relations: ["tickets"] });
    if (!activity) throw new NotFoundError();
    const ticket = await Ticket.findOne({ where: { userId: userId } });
    const AllActivities = ticket.activities;
    const userActivities = AllActivities.filter(
      (act) => act.dateId === activity.dateId
    );
    const validationTime = this.checkTimeValidation(
      activity.start,
      activity.end,
      userActivities
    );
    if (!validationTime) throw new ConflictInTimeActivity();
    if ((activity.totalOfSeats - activity.tickets.length) <= 0) throw new EventIsFull();
    ticket.activities.push(activity);
    ticket.save();
  }

  static checkTimeValidation(startTimeActivity: Date, endTimeActivity: Date, userActivities: Activity[]) {
    const start = dayjs(startTimeActivity);
    const end = dayjs(endTimeActivity);
    
    for(let i = 0; i < userActivities.length; i ++) {
      if(start.diff(userActivities[i].end, "minutes") >= 0 || end.diff(userActivities[i].start, "minutes") <= 0) continue;
      return false;
    }

    return true;
  }

  static async listActivitiesByDate(dateId: number) {
    const activities = await this.find({
      where: { dateId: dateId },
      order: { placeId: "ASC", start: "ASC" },
      relations: ["tickets"],
    });
    const places: Place[] = [];
    let currentId: number = null;

    activities.map((activity) => {
      if (activity.placeId !== currentId) {
        places.push({
          id: activity.place.id,
          name: activity.place.name,
          activities: [],
        } as Place);
        currentId = activity.placeId;
      }

      delete activity.place;
      delete activity.date;
      activity.totalOfSeats = activity.totalOfSeats - activity.tickets.length;

      places[places.length - 1].activities.push(activity);
    });

    return places;
  }

  static async unsubscribe(userId: number, activityId: number) {
    const ticket = await Ticket.findOne({ where: { userId } });

    if (!ticket) throw new NotFoundError();
    
    const userActivities = ticket.activities;
    const remainingUserActivities = userActivities.filter((activity) => activity.id !== activityId);
    
    if(userActivities.length === remainingUserActivities.length) throw new NotFoundError();

    ticket.activities = remainingUserActivities;
    ticket.save();
  }
}
