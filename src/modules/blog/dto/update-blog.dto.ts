import { PartialType } from '@nestjs/swagger';
import { CreateBlogDto } from './create-blog.dto';
import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsString, Length } from "class-validator";

//partialType iis gonna optional all of the creatBlogDto's options
export class UpdateBlogDto extends PartialType(CreateBlogDto) {
}
