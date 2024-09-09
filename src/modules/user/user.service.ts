import { Inject, Injectable, Scope } from '@nestjs/common';
import { ProfileDto } from './dto/profile.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Request } from 'express';
import { REQUEST } from '@nestjs/core';
import { ProlfileEntity } from './entities/profile.entity';
import { deleteEmptyInputs } from 'src/common/utils/functions.util';

@Injectable({ scope: Scope.REQUEST })
export class UserService {
    constructor(
        @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>,
        @InjectRepository(ProlfileEntity) private profileRepository: Repository<ProlfileEntity>,
        @Inject(REQUEST) private req: Request
    ) { }
    async updateProfile(files:any ,updateProfileDto: ProfileDto) {
        console.log(files);
        
        const { profileId, id: userId, } = this.req.user
        const body = deleteEmptyInputs(updateProfileDto)
        
        let profile = await this.profileRepository.findOneBy({userId  })
        // if(!profile){
        //     profile = this.profileRepository.create({...body, userId})
        //     await this.profileRepository.save(profile)
        // }else{
        //     profile = this.profileRepository.merge(profile, body)
        //     await this.profileRepository.save(profile)
        // }
        if(!profileId){
            // await this.userRepository.update({ id: userId }, { profileId: profile.id })
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
