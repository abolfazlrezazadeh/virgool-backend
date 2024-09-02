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
import { OtpEntity } from '../user/entities/otp.entity';
import { randomInt } from 'crypto';
import { TokenService } from './tokens.auth.service';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserEntity) private userRespository: Repository<UserEntity>,
        @InjectRepository(ProlfileEntity) private profileRespository: Repository<ProlfileEntity>,
        @InjectRepository(OtpEntity) private otpRespository: Repository<OtpEntity>,
        private tokenService:TokenService,
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
        // otp side
        const otp = await this.saveOtp(user.id)
        return {
            code: otp.code,
            userId:user.id
        }

    }
    async register(method: authMethod, username: string) {
        const validUsername = this.usernameVallidator(method, username)
        let user = await this.checkExistUser(method, validUsername)
        if (user) throw new ConflictException(AuthMessage.AlreadyExists)
        if (method === authMethod.Username) {
            throw new BadRequestException(BadRequestMessage.InvalidData)
        }
        user = this.userRespository.create({
            [method]: username
        })
        user = await this.userRespository.save(user)
        user.username = `m_${user.id}`
        await this.userRespository.save(user)
        const otp = await this.saveOtp(user.id)
        return {
            code: otp.code,
            userId:user.id
        }
    }
    async checkOtp() {

    }
    async saveOtp(userId: number) {
        const code = randomInt(10_000, 99_999).toString()
        // 2 minuts
        const expiresIn = new Date(Date.now() + (2 * 60 * 1000))
        // find otp exist
        let existOtp: boolean = false
        let otp = await this.otpRespository.findOneBy({ userId })
        if (otp) {
            existOtp = true
            otp.code = code
            otp.expiresIn = expiresIn
        } else {
            otp = this.otpRespository.create({
                userId,
                code,
                expiresIn
            })
        }
        otp = await this.otpRespository.save(otp)
        if (!existOtp) {
            await this.userRespository.update(userId, { otpId: otp.id })
        }
        return otp;


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
