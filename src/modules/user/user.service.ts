import { Inject, Injectable, Scope } from '@nestjs/common';
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

@Injectable({ scope: Scope.REQUEST })
export class UserService {
    constructor(
        @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>,
        @InjectRepository(ProlfileEntity) private profileRepository: Repository<ProlfileEntity>,
        @Inject(REQUEST) private req: Request
    ) { }
    async updateProfile(files: any, updateProfileDto: ProfileDto) {
        try {
            if (files?.image.length > 0) {
                let [image] = files?.image
                updateProfileDto.image = (image?.path).replace(/\\/g, "/");
            }
            if (files?.backgroundImage.length > 0) {
                let [image] = files?.backgroundImage
                updateProfileDto.backgroundImage = (image?.path).replace(/\\/g, "/");
            }
            const { profileId, id: userId, } = this.req.user
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
                status : 200,
                message: publicMessages.Updated
            }
        } catch (error) {

        }
    }
    async findUserProfile(id: number) {
        return await this.userRepository.findOne({
            where: { id },
            relations: {
                profile: true
            }
        })
    }
}
