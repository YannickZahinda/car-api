import { CanActivate, ExecutionContext } from "@nestjs/common";
import { Observable } from "rxjs";

export class AdminGuard implements CanActivate {
    //execution content wraps the incomming request: to remember
    canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();

        if (!request.CurrentUser){
            return false;
        }

        request.CurrentUser.admin
    }
}