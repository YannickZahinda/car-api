import { CanActivate, ExecutionContext} from "@nestjs/common";

export class AuthGard implements CanActivate {
    canActivate(context: ExecutionContext):boolean {
        const request = context.switchToHttp().getRequest();

        return request.session.userId;
    }
}