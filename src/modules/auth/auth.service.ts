import { BadRequestException, ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { authDto } from './dto/auth.dto';
import { authType } from './enums/type.enum';
import { authMethod } from './enums/method.enum';
import { isEmail, isPhoneNumber } from 'class-validator';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import { ProlfileEntity } from '../user/entities/profile.entity';
import { AuthMessage, BadRequestMessage } from './enums/messages.enum';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserEntity) private userRespository: Repository<UserEntity>,
        @InjectRepository(ProlfileEntity) private profileRespository: Repository<ProlfileEntity>

    ) { }
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
        const validUsername = this.usernameVallidator(method, username)
        const user = await this.checkExistUser(method, validUsername)
        if (!user) throw new UnauthorizedException(AuthMessage.NotFoundAccoant)
    }
    async register(method: authMethod, username: string) {
        const validUsername = this.usernameVallidator(method, username)
        const user = await this.checkExistUser(method, validUsername)
        if (user) throw new ConflictException(AuthMessage.AlreadyExists)
    }
    async checkOtp() { 
        
    }
    async checkExistUser(method: authMethod, username: string) {
        let user: UserEntity;
        if (method === authMethod.Phone) {
            user = await this.userRespository.findOneBy({ phone: username })
        } else if (method === authMethod.Email) {
            user = await this.userRespository.findOneBy({ email: username })
        } else if (method === authMethod.Username) {
            user = await this.userRespository.findOneBy({ username: username })
        } else {
            throw new BadRequestException(BadRequestMessage.InvalidData)
        }
        return user
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
