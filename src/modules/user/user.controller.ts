import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards, UseInterceptors, UploadedFiles, ParseFilePipe } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { ProfileDto } from './dto/profile.dto';
import { swaggerConsumes } from '../auth/enums/swagger-consumes.enum';
import { authGuard } from '../auth/guards/auth.guard';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { fileFilter, multerDestination, multerFileName } from 'src/common/utils/multer.util';

@Controller('user')
@ApiTags("user")
  // no need to use this in restfull api 
  @ApiBearerAuth("Authorization")
  @UseGuards(authGuard)
export class UserController {
  constructor(private readonly UserService: UserService) {}

  @Put("update-profile")
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'image', maxCount: 1 },
    { name: 'backgroundImage', maxCount: 1 },
  ],{
    storage:diskStorage({
      destination:multerDestination("user-profile"),
      filename:multerFileName,
    }),
    fileFilter:fileFilter
  }))
  @ApiConsumes(swaggerConsumes.multipartData)
  changeProfile(
    @UploadedFiles(new ParseFilePipe({fileIsRequired:false,validators:[]})) files:any,
    @Body() updateProfileDto: ProfileDto) {
    return this.UserService.updateProfile(files ,updateProfileDto);
  }
}
