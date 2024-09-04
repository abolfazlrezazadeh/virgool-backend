import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Request } from "express";
import { AuthMessage } from "../enums/messages.enum";
import { isJWT } from "class-validator";
import { AuthService } from '../auth.service';

@Injectable()
export class authGuard implements CanActivate {
    constructor(private authService: AuthService) { }
    async canActivate(context: ExecutionContext) {
        const httpContext = context.switchToHttp();
        const request: Request = httpContext.getRequest<Request>();
        const token = this.extractUser(request);
        request.user = await this.authService.getUserFromAccessToken(token);
        return true;
    }
    protected extractUser(request:Request){
        const { authorization } = request.headers
        if (!authorization || authorization.trim() === "") throw new UnauthorizedException(AuthMessage.LoginIsRequired)
        const [bearer, token] = authorization.split(" ")
        if (bearer?.toLowerCase() !== "bearer" || !token || !isJWT(token)) throw new UnauthorizedException(AuthMessage.LoginIsRequired)
        return token
    }
}