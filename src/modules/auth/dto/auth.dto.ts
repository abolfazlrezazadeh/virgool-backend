import { ApiProperty } from "@nestjs/swagger";
import { authType } from "../enums/type.enum";
import { authMethod } from "../enums/method.enum";
import { IS_LENGTH, IsEnum, IsString, Length } from "class-validator";


export class authDto {
    @ApiProperty() 
    @IsString()
    @Length(3,50)
    username:string;
    @ApiProperty({enum:authType})
    @IsEnum(authType)
    type:string;
    @ApiProperty({enum:authMethod})
    @IsEnum(authMethod)
    method:authMethod;
}
export class checkOtpDto {
    @ApiProperty() 
    @IsString()
    @Length(5,5)
    code:string;
}