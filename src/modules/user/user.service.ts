import { ConflictException, Inject, Injectable, Scope } from '@nestjs/common';
import { ProfileDto } from './dto/profile.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Request, response } from 'express';
import { REQUEST } from '@nestjs/core';
import { ProlfileEntity } from './entities/profile.entity';
import { deleteEmptyInputs } from 'src/common/utils/functions.util';
import { publicMessages } from '../auth/enums/messages.enum';
import { Response } from 'express';
import { imageFiles } from './types/imageFiles.types';
import { AuthService } from '../auth/auth.service';
import { TokenService } from '../auth/tokens.auth.service';

@Injectable({ scope: Scope.REQUEST })
export class UserService {
    constructor(
        @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>,
        @InjectRepository(ProlfileEntity) private profileRepository: Repository<ProlfileEntity>,
        @Inject(REQUEST) private req: Request,
        private authService: AuthService,
        private tokenService: TokenService
    ) { }
    async updateProfile(files: imageFiles, updateProfileDto: ProfileDto) {
        try {
            const { profileId, id: userId, } = this.req.user
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
        const { id } = this.req.user
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
        const { id } = this.req.user
        const user = await this.userRepository.findOneBy({ email })
        // eamil has been used by another one
        if (user.id !== id) {
            throw new ConflictException(publicMessages.ExistEmail)
        }
        // email is the same email
        else if (user && user.id === id) {
            return {
                status: 200,
                message: publicMessages.Updated
            }
        }
        user.newEmail = email
        const otp = await this.authService.saveOtp(id)
        const token = await this.tokenService.createEmailToken({ email })
        return {
            status: 200,
            otp: otp.code,
            token
        }
    }
}
