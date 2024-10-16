import { NestInterceptor, ExecutionContext, CallHandler, Injectable } from "@nestjs/common";
import { UsersService } from "../users.service";
import { Observable } from "rxjs";

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
    constructor(private usersService: UsersService){}

    async intercept(context: ExecutionContext, handler: CallHandler<any>) {
        const request = context.switchToHttp().getRequest();
        //We below going to find the user ID inside the user object
        const {userId} = request.session;

        if (userId){
            const user = await this.usersService.findOne(userId);
            request.CurrentUser = user;
        }
        return handler.handle();
    }
}
