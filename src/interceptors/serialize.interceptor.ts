import { UseInterceptors, NestInterceptor, ExecutionContext, CallHandler } from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { plainToClass } from "class-transformer";

interface ClassConstructor {
    new (...args: any[]): {};
}

export function Serialize(dto: ClassConstructor){
    return UseInterceptors(new SerializeInterceptor(dto))
}

export class SerializeInterceptor implements NestInterceptor {
    constructor (private dto: any){}

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            map((data: any) => {
                //here we're turning incoming entity of data to instance of the UserDto Entity with the two exposed params
                return plainToClass(this.dto, data, {
                    excludeExtraneousValues: true,
                })
                
            })
        )
    }
}