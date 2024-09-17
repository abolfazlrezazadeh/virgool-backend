import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { cookiePayload, emailPayload, phonePayload } from "./types/payload";
import { AuthMessage, BadRequestMessage } from "./enums/messages.enum";


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
    async createAccessToken(payload: cookiePayload) {
        return await this.jwtService.signAsync(payload, {
            secret: process.env.ACCESS_TOKEN_SECRET,
            // 1 year
            expiresIn: "1y"
        })
    }
    async verifyAccessToken(token: string): Promise<cookiePayload> {
        try {
            return this.jwtService.verify(token, {
                secret: process.env.ACCESS_TOKEN_SECRET
            })
        } catch (error) {
            throw new UnauthorizedException(AuthMessage.TryAgain)
        }
    }
    async createEmailToken(payload: emailPayload) {
        return await this.jwtService.signAsync(payload, {
            secret: process.env.EMAIL_TOKEN_SECRET,
            // 1 year
            expiresIn: 60 * 2
        })
    }
    async verifyEmailToken(token: string): Promise<emailPayload> {
        try {
            return this.jwtService.verify(token, {
                secret: process.env.EMAIL_TOKEN_SECRET
            })
        } catch (error) {
            throw new BadRequestException(BadRequestMessage.InvalidData)
        }
    }
    async createPhoneToken(payload: phonePayload) {
        return await this.jwtService.signAsync(payload, {
            secret: process.env.PHONE_TOKEN_SECRET,
            // 1 year
            expiresIn: 60 * 2
        })
    }
    async verifyPhoneToken(token: string): Promise<phonePayload> {
        try {
            return this.jwtService.verify(token, {
                secret: process.env.PHONE_TOKEN_SECRET
            })
        } catch (error) {
            throw new BadRequestException(BadRequestMessage.InvalidData)
        }
    }
}