import { applyDecorators } from "@nestjs/common";
import { ApiQuery, ApiResponseProperty } from "@nestjs/swagger";

export function filterBlog() {
    return applyDecorators(
        ApiQuery({ name: "category", type: String, example: "node.js", required: false }),
    )
}