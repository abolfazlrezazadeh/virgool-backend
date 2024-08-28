import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserEntity } from './entities/user.entity';
import { ProlfileEntity } from './entities/profile.entity';

@Module({
  imports:[UserEntity,ProlfileEntity],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
