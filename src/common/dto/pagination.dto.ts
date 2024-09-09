import { ApiPropertyOptional } from "@nestjs/swagger";


export class paginationDto {
    @ApiPropertyOptional({type:"integer"})
    page: number;
    @ApiPropertyOptional({type:"integer"})
    limit: number;
}