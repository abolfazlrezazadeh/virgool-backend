import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNumber, IsNumberString, IsOptional, Length } from "class-validator";


export class createCommentDto{
    @ApiProperty()
    @Length(5)
    text:string
    @ApiPropertyOptional()
    @IsOptional()
    @IsNumberString()
    parentId:number
    @ApiProperty()
    @IsNumber()
    blogId:number

}