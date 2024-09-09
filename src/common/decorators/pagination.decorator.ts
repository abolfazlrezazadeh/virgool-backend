import { applyDecorators } from "@nestjs/common";
import { ApiQuery, ApiResponseProperty } from "@nestjs/swagger";

export function paginationDecorator() {
    return applyDecorators(
        ApiQuery({ name: "page", type: Number, example: 1, required: false }),
        ApiQuery({ name: "limit", type: Number, required: false, example: 10 }),
    )
}