import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards, UseInterceptors, UploadedFiles, ParseFilePipe, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { ProfileDto, updateEmailDto, updatePhoneDto } from './dto/profile.dto';
import { swaggerConsumes } from '../auth/enums/swagger-consumes.enum';
import { authGuard } from '../auth/guards/auth.guard';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { fileFilter, multerDestination, multerFileName, multerStorage } from 'src/common/utils/multer.util';
import { imageFiles } from './types/imageFiles.types';
import { uploadOptionalFiles } from 'src/common/decorators/uploadFile.decorator';
import { Response } from 'express';
import { CookieKeys } from '../auth/enums/cookie.enums';
import { cookieOptionsToken } from 'src/common/utils/cookie.utils';
import { publicMessages } from '../auth/enums/messages.enum';
import { checkOtpDto } from '../auth/dto/auth.dto';

@Controller('user')
@ApiTags("user")
// no need to use this in restfull api 
@ApiBearerAuth("Authorization")
@UseGuards(authGuard)
export class UserController {
  constructor(private readonly UserService: UserService) { }

  @Put("update-profile")
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'image', maxCount: 1 },
    { name: 'backgroundImage', maxCount: 1 },
  ], {
    storage: multerStorage("user-profile"),
    fileFilter: fileFilter
  }))
  @ApiConsumes(swaggerConsumes.multipartData)
  changeProfile(
    @uploadOptionalFiles() files: imageFiles,
    @Body() updateProfileDto: ProfileDto) {
    return this.UserService.updateProfile(files, updateProfileDto);
  }

  @Get("profile")
  profile() {
    return this.UserService.profile()
  }

  @Patch('update-email')
  @ApiConsumes(swaggerConsumes.UrlEncoded, swaggerConsumes.Json)
  async updateEmail(@Body() updateEmailDto: updateEmailDto, @Res() res: Response) {
    const { token, otp, message } = await this.UserService.changeEmail(updateEmailDto.email)
    if (message) return res.json({ message })
    res.cookie(CookieKeys.EMAIL, token, cookieOptionsToken())
    res.json({
      otp,
      message: publicMessages.SendOtp
    })
  }

  @Post('verify-email')
  @ApiConsumes(swaggerConsumes.UrlEncoded, swaggerConsumes.Json)
  async verifyEmail(@Body() checkOtpDto: checkOtpDto) {
    return this.UserService.verifyEmail(checkOtpDto.code)

  }

  @Patch('update-phone')
  async updatePhone(@Body() updatePhoneDto: updatePhoneDto, @Res() res: Response) {
    const { token, otp, message } = await this.UserService.changePhone(updatePhoneDto.phone)
    if (message) return res.json({ message })
    res.cookie(CookieKeys.EMAIL, token, cookieOptionsToken())
    res.json({
      otp,
      message: publicMessages.SendOtp
    })
  }
}
