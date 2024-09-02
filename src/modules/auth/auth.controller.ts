import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { authDto } from './dto/auth.dto';
import { swaggerConsumes } from './enums/swagger-consumes.enum';
import { Response } from 'express';
import { CookieKeys } from './enums/cookie.enums';

@Controller('auth')
@ApiTags("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post("user-existence")
  @ApiConsumes(swaggerConsumes.UrlEncoded,swaggerConsumes.Json)
  UserExistence(@Body() authDto: authDto,@Res() res:Response) {
    const result= this.authService.userExistence(authDto)
    res.cookie(CookieKeys.OTP).send(result)
  }
}
