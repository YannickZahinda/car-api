import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "src/users/user.entity";


@Entity()
export class Report {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    price: number;

    @Column()
    make: string;//company who made it

    @Column()
    model: string 

    @Column()
    year: number;

    @Column()
    lng: number;

    @Column()
    lat: number;

    @Column()
    mileage: number;

    @Column({default: false})
    approved: boolean;

    @ManyToOne(() => User, (user) => user.reports)
    user: User;

}