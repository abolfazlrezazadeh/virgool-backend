import { BadRequestException, ConflictException, Inject, Injectable, Scope, UnauthorizedException } from '@nestjs/common';
import { ProfileDto } from './dto/profile.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Request } from 'express';
import { REQUEST } from '@nestjs/core';
import { ProlfileEntity } from './entities/profile.entity';
import { deleteEmptyInputs } from 'src/common/utils/functions.util';
import { AuthMessage, NotFoundMessages, publicMessages } from '../auth/enums/messages.enum';
import { imageFiles } from './types/imageFiles.types';
import { AuthService } from '../auth/auth.service';
import { TokenService } from '../auth/tokens.auth.service';
import { OtpEntity } from './entities/otp.entity';
import { CookieKeys } from '../auth/enums/cookie.enums';
import { authMethod } from '../auth/enums/method.enum';

@Injectable({ scope: Scope.REQUEST })
export class UserService {
    constructor(
        @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>,
        @InjectRepository(ProlfileEntity) private profileRepository: Repository<ProlfileEntity>,
        @InjectRepository(OtpEntity) private OtpEntity: Repository<OtpEntity>,
        @Inject(REQUEST) private request: Request,
        private authService: AuthService,
        private tokenService: TokenService
    ) { }
    async updateProfile(files: imageFiles, updateProfileDto: ProfileDto) {
        try {
            const { profileId, id: userId, } = this.request.user
            this.setImageToDto(files, updateProfileDto)
            const body = deleteEmptyInputs(updateProfileDto)
            let profile = await this.profileRepository.findOneBy({ userId })
            if (!profile) {
                profile = this.profileRepository.create({ ...body, userId })
                await this.profileRepository.save(profile)
            } else {
                profile = this.profileRepository.merge(profile, body)
                await this.profileRepository.save(profile)
            }
            if (!profileId) {
                await this.userRepository.update({ id: userId }, { profileId: profile.id })
            }
            return {
                status: 200,
                message: publicMessages.Updated
            }
        } catch (error) {

        }
    }
    async profile() {
        const { id } = this.request.user
        const user = await this.userRepository.findOne({
            where: { id },
            relations: ['profile']
        })
        return user
    }
    async findUserProfile(id: number) {
        const userProfile = await this.profileRepository.findOneBy({ userId: id })
        return userProfile ? userProfile : null
    }
    setImageToDto(files: imageFiles, updateProfileDto: ProfileDto) {
        if (files?.image.length > 0) {
            let [image] = files?.image
            updateProfileDto.image = (image?.path).replace(/\\/g, "/").slice(7);
        }
        if (files?.backgroundImage.length > 0) {
            let [image] = files?.backgroundImage
            updateProfileDto.backgroundImage = (image?.path).replace(/\\/g, "/").slice(7);
        }
    }
    async changeEmail(email: string) { 
        const { id } = this.request.user
        const user = await this.userRepository.findOneBy({ email })
        // eamil has been used by another one
        if (user && user.id !== id) {
            throw new ConflictException(publicMessages.ExistEmail)
        }
        // email is the same email
        else if (user && user.id == id) {
            return {
                status: 200,
                message: publicMessages.Updated
            }
        }
        await this.userRepository.update({id},{newEmail:email})
        const otp = await this.authService.saveOtp(id, authMethod.Email)        
        const token = await this.tokenService.createEmailToken({ email })
        return {
            status: 200,
            otp: otp.code,
            token
        }
    }
    async verifyEmail(code: string) {
        const { id: userId, newEmail } = this.request.user
        const token = this.request.cookies?.[CookieKeys.EMAIL]
        if (!token) throw new UnauthorizedException(AuthMessage.TokenExpired)
        const { email } = await this.tokenService.verifyEmailToken(token)
        if (email !== newEmail) throw new BadRequestException(AuthMessage.WrongEmail)
        const otp = await this.checkotp(userId, code)
        if (otp.method !== authMethod.Email) throw new BadRequestException(AuthMessage.WrongOtp)
        await this.userRepository.update({id:userId},{
            email,
            verifyEmail:true,
            newEmail:null
        })
        // await this.OtpEntity.delete({userId})
        return {
            message: publicMessages.Updated,        
        }

    }
    async changePhone(phone: string) { 
        const { id } = this.request.user
        const user = await this.userRepository.findOneBy({ phone })
        // phone has been used by another one
        if (user && user.id !== id) {
            throw new ConflictException(publicMessages.ExistPhone)
        }
        // phone is the same phone
        else if (user && user.id == id) {
            return {
                status: 200,
                message: publicMessages.Updated
            }
        }
        await this.userRepository.update({id},{newPhone:phone})
        const otp = await this.authService.saveOtp(id, authMethod.Phone)        
        const token = await this.tokenService.createPhoneToken({  phone})
        return {
            status: 200,
            otp: otp.code,
            token
        }
    }
    async verifyPhone(code: string) {
        const { id: userId, newPhone } = this.request.user
        const token = this.request.cookies?.[CookieKeys.PHONE]
        if (!token) throw new UnauthorizedException(AuthMessage.TokenExpired)
        const { phone } = await this.tokenService.verifyPhoneToken(token)
        if (phone !== newPhone) throw new BadRequestException(AuthMessage.WrongPhone)
        const otp = await this.checkotp(userId, code)
        if (otp.method !== authMethod.Phone) throw new BadRequestException(AuthMessage.WrongOtp)
        await this.userRepository.update({id:userId},{
            phone,
            verifyPhone:true,
            newPhone:null
        })
        // await this.OtpEntity.delete({userId})
        return {
            message: publicMessages.Updated,        
        }

    }
    async checkotp(userId: number, code: string) {
        const now = new Date()
        const otp = await this.OtpEntity.findOneBy({ userId })
        if (!otp) throw new BadRequestException(NotFoundMessages.NotFound)
        if (otp.expiresIn < now) throw new BadRequestException(AuthMessage.TokenExpired)
        if (otp.code !== code) throw new BadRequestException(AuthMessage.WrongOtp)
        return otp
    }
    async changeUserName(username:string){
        const {id} = this.request.user
        const isExisrUser = await this.userRepository.findOneBy({username})
        if(isExisrUser){
            throw new BadRequestException(AuthMessage.UsernameExist)
        }
        await this.userRepository.update({id},{username})
        return {
            message : "Username updated successfully"
        }
    }

}
