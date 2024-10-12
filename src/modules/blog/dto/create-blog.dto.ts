import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, IsString, Length } from "class-validator";

export class CreateBlogDto {
    @ApiProperty({ example: 'title' })
    @IsNotEmpty()
    @IsString()
    @Length(3, 30)
    title: string;
    @ApiProperty({ example: '5' })
    @IsNotEmpty()
    @IsString()
    @Length(1,2)
    timeToRead: string;

    @ApiProperty({ example: 'description' })
    @IsNotEmpty()
    @IsString()
    @Length(3, 100)
    description: string;

    @ApiPropertyOptional()
    slug:string

    @ApiProperty({ example: 'content' })
    @IsNotEmpty()
    @IsString()
    @Length(300)
    content: string;

    @ApiPropertyOptional({nullable:true,format:"binary"})
    image:string
}
