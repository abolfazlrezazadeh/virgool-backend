import { Injectable } from '@nestjs/common';
import { authDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
    userExistence(authDto: authDto) {
        return authDto
    }
}
