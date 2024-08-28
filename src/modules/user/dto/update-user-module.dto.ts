import { PartialType } from '@nestjs/swagger';
import { CreateUserModuleDto } from './create-user-module.dto';

export class UpdateUserModuleDto extends PartialType(CreateUserModuleDto) {}
