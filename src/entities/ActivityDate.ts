import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("activitiesDates")
export default class ActivityDate extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "timestamp" })
    date: Date;

    static async getDates() {
      return await this.find();
    }
}
