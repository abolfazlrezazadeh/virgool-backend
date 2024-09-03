import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { cookiePayload } from "./types/payload";
import { AuthMessage } from "./enums/messages.enum";


@Injectable()
export class TokenService {
    constructor(
        private jwtService: JwtService
    ) { }

    async createOtpToken(payload: cookiePayload) {
        return await this.jwtService.signAsync(payload, {
            secret: process.env.OTP_TOKEN_SECRET,
            // 2 minuts
            expiresIn: 60 * 2
        })
    }
    verifyOtpToken(token: string): cookiePayload {
        try {
            return this.jwtService.verify(token, {
                secret: process.env.OTP_TOKEN_SECRET
            })
        } catch (error) {
            throw new UnauthorizedException(AuthMessage.TryAgain)
        }
    }
}