import { Expose, Transform } from "class-transformer";
import { User } from "src/users/user.entity";

export class ReportDto {
    @Expose()
    id: number;
    @Expose()
    price: number;
    @Expose()
    year: number;
    @Expose()
    lng: number;
    @Expose()
    lat: number;
    @Expose()
    make: string;
    @Expose()
    model: string;
    @Expose()
    mileage: number

    @Expose()
    approved: boolean

    @Transform(({obj}) => obj.user.id)// still allow to access the user orignal User entity and only expose the user id then assign it to the userId new property added
    @Expose()
    userId: number;
}