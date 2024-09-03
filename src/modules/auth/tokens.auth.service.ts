import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { cookiePayload } from "./types/payload";


@Injectable() 
export class TokenService {
    constructor(
        private jwtService:JwtService
    ) { }

    async createOtpToken(payload: cookiePayload) {
        return await this.jwtService.signAsync(payload,{
            secret:process.env.OTP_TOKEN_SECRET,
            expiresIn:process.env.OTP_TOKEN_EXPIRES_IN
        })
    }
}