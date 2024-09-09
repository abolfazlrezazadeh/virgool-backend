import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { JwtService } from '@nestjs/jwt';
import { TokenService } from './tokens.auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../user/entities/user.entity';
import { OtpEntity } from '../user/entities/otp.entity';
import { ProlfileEntity } from '../user/entities/profile.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity,OtpEntity,ProlfileEntity])],
  controllers: [AuthController],
  providers: [AuthService,JwtService,TokenService],
  exports:[AuthService,JwtService,TokenService,TypeOrmModule]
})
export class AuthModule {}
