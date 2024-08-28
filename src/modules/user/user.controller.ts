import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserModuleDto } from './dto/create-user-module.dto';
import { UpdateUserModuleDto } from './dto/update-user-module.dto';

@Controller('user')
export class UserController {
  constructor(private readonly UserService: UserService) {}

  @Post()
  create(@Body() createUserModuleDto: CreateUserModuleDto) {
    return this.UserService.create(createUserModuleDto);
  }

  @Get()
  findAll() {
    return this.UserService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.UserService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserModuleDto: UpdateUserModuleDto) {
    return this.UserService.update(+id, updateUserModuleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.UserService.remove(+id);
  }
}
