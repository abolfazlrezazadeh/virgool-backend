import { paginationDto } from "../dto/pagination.dto";


export function paginationSolver(paginationDto: paginationDto) {
    let { page = 0, limit = 0 } = paginationDto
    if (!page || page <= 1) page = 0
    else page = page - 1

    if (!limit || limit <= 0) limit = 10
    let skip = page * limit

    return {
        page : page === 0 ? 1 : page,
        limit,
        skip
    }

}

export function paginationResponse(page: number = 0, limit: number = 0, count: number = 0) {
    return {
        page:+page,
        limit: +limit,
        totalCount : +count,
        pageCount: Math.ceil(count/limit)
    }
}