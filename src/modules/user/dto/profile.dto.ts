import { ApiPropertyOptional } from "@nestjs/swagger"
import { IsEnum, IsOptional, IsUrl, Length } from "class-validator"
import { genderChoose } from "src/modules/auth/enums/gender.enum"

export class ProfileDto {
    @ApiPropertyOptional()
    @IsOptional()
    @Length(3,20)
    naickName:string
    
    @ApiPropertyOptional({nullable:true})
    @IsOptional()
    @Length(3,200)
    bio:string

    @ApiPropertyOptional({nullable:true,format:"binary"})
    image:string

    @ApiPropertyOptional({nullable:true,format:"binary"})
    backgroundImage:string

    @ApiPropertyOptional({nullable:true,enum:genderChoose})
    @IsEnum(genderChoose)
    gender:string

    @IsOptional()
    @ApiPropertyOptional({nullable:true})
    birthday:string

    @ApiPropertyOptional({nullable:true})
    @IsOptional()
    @IsUrl({},{message:"Invalid url"})
    linkedIn:string

    @ApiPropertyOptional({nullable:true})
    @IsOptional()
    @IsUrl({},{message:"Invalid url"})
    twitter:string
}