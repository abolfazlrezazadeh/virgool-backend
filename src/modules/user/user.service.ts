import { Injectable } from '@nestjs/common';
import { CreateUserModuleDto } from './dto/create-user-module.dto';
import { UpdateUserModuleDto } from './dto/update-user-module.dto';

@Injectable()
export class UserService {
  create(createUserModuleDto: CreateUserModuleDto) {
    return 'This action adds a new userModule';
  }

  findAll() {
    return `This action returns all userModule`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userModule`;
  }

  update(id: number, updateUserModuleDto: UpdateUserModuleDto) {
    return `This action updates a #${id} userModule`;
  }

  remove(id: number) {
    return `This action removes a #${id} userModule`;
  }
}
