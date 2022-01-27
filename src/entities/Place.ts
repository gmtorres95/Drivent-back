import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import Activity from "./Activity";

@Entity("places")
export default class Place extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(() => Activity, (activity) => activity.place)
    activity: Activity
}
