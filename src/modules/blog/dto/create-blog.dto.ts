import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsString, Length } from "class-validator";

export class CreateBlogDto {
    @ApiProperty({ example: 'title' })
    @IsNotEmpty()
    @IsString()
    @Length(3, 100)
    title: string;
    @ApiProperty({ example: '5' })
    @IsNotEmpty()
    @IsString()
    @Length(1,2)
    timeToRead: string;

    @ApiProperty({ example: 'description' })
    @IsNotEmpty()
    @IsString()
    @Length(3, 1000)
    description: string;

    @ApiPropertyOptional()
    slug: string

    @ApiProperty({ example: 'content' })
    @IsNotEmpty()
    @IsString()
    @Length(20)
    content: string;

    @ApiPropertyOptional({ nullable: true, format: "binary" })
    image: string;

    @ApiProperty({ type: String, isArray: true })
    // @IsArray()
    categories: string[] | string

}
