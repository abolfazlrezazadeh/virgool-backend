import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { authDto } from './dto/auth.dto';
import { authType } from './enums/type.enum';
import { authMethod } from './enums/method.enum';
import { isEmail, isPhoneNumber } from 'class-validator';

@Injectable()
export class AuthService {
    async userExistence(authDto: authDto) {
        const { type, method, username } = authDto
        switch (type) {
            case authType.Login:
                return await this.login(method, username)
            case authType.Register:
                return await this.register(method, username)
            default:
                throw new UnauthorizedException("failed, type is incorrect")
        }
    }
    async login(method: authMethod, username: string) {
        return this.usernameVallidator(method, username)
    }
    async register(method: authMethod, username: string) {
        return this.usernameVallidator(method, username)
    }

    usernameVallidator(method: authMethod, username: string) {
        switch (method) {
            case authMethod.Email:
                if (isEmail(username)) return username;
                throw new BadRequestException("email format is not correct")
            case authMethod.Phone:
                if (isPhoneNumber(username, "IR")) return username
                throw new BadRequestException("phone number format is not correct")
            case authMethod.Username:
                return username;
            default: throw new UnauthorizedException('failed, method is not correct')
        }
    }
}
