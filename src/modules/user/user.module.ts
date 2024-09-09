import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserEntity } from './entities/user.entity';
import { ProlfileEntity } from './entities/profile.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OtpEntity } from './entities/otp.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports:[AuthModule,TypeOrmModule.forFeature([UserEntity,ProlfileEntity,OtpEntity])],
  controllers: [UserController],
  providers: [UserService],
  exports:[UserService,TypeOrmModule]
})
export class UserModule {}
