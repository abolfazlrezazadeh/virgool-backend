import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { authDto } from './dto/auth.dto';
import { swaggerConsumes } from './enums/swagger-consumes.enum';

@Controller('auth')
@ApiTags("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post("user-existence")
  @ApiConsumes(swaggerConsumes.UrlEncoded,swaggerConsumes.Json)
  UserExistence(@Body() authDto: authDto) {
    return this.authService.userExistence(authDto)
  }
}
