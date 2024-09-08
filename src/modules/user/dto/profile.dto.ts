import { ApiPropertyOptional } from "@nestjs/swagger"
import { IsEnum, IsUrl, Length } from "class-validator"
import { genderChoose } from "src/modules/auth/enums/gender.enum"

export class ProfileDto {
    @ApiPropertyOptional()
    @Length(3,20)
    naickName:string
    @ApiPropertyOptional({nullable:true})
    @Length(3,200)
    bio:string
    @ApiPropertyOptional({nullable:true,format:"binary"})
    image:string
    @ApiPropertyOptional({nullable:true,format:"binary"})
    backgroundImage:string
    @ApiPropertyOptional({nullable:true,enum:genderChoose})
    @IsEnum(genderChoose)
    gender:string
    @ApiPropertyOptional({nullable:true})
    birthday:string
    @ApiPropertyOptional({nullable:true})
    @IsUrl({},{message:"Invalid url"})
    linkedIn:string
    @ApiPropertyOptional({nullable:true})
    @IsUrl({},{message:"Invalid url"})
    twitter:string
}