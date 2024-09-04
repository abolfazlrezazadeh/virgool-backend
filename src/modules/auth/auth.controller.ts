import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { authDto, checkOtpDto } from './dto/auth.dto';
import { swaggerConsumes } from './enums/swagger-consumes.enum';
import { Request, Response } from 'express';
import { CookieKeys } from './enums/cookie.enums';
import { authGuard } from './guards/auth.guard';

@Controller('auth')
@ApiTags("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post("user-existence")
  @ApiConsumes(swaggerConsumes.UrlEncoded,swaggerConsumes.Json)
  UserExistence(@Body() authDto: authDto,@Res() res:Response) {
    return this.authService.userExistence(authDto,res)
    
  }
  @Post("checkOtp")
  @ApiConsumes(swaggerConsumes.UrlEncoded,swaggerConsumes.Json)
  checkOtp(@Body() checkOtpDto: checkOtpDto) {
    return this.authService.checkOtp(checkOtpDto.code)
  }
  @Get("checkLogin")
  // no need to use this in restfull api 
  @ApiBearerAuth("Authorization")
  @UseGuards(authGuard)
  checkLogin(@Req() req: Request) {
    return req.user;
  }
}
