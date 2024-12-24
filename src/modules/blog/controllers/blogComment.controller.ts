import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, ParseIntPipe, Put } from '@nestjs/common';
import { BlogService } from '../services/blog.service';
import { CreateBlogDto, filterBlogDto } from '../dto/create-blog.dto';
import { UpdateBlogDto } from '../dto/update-blog.dto';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { swaggerConsumes } from '../../auth/enums/swagger-consumes.enum';
import { authGuard } from '../../auth/guards/auth.guard';
import { paginationDecorator } from 'src/common/decorators/pagination.decorator';
import { paginationDto } from 'src/common/dto/pagination.dto';
import { skipAuth } from 'src/common/decorators/skipAuth.decorator';
import { filterBlog } from '../../../common/decorators/filter.decorator';
import { BlogCommentService } from '../services/blogComment.service';
import { createCommentDto } from '../dto/blogComment.dto';

@Controller('blog-comment')
@ApiTags('Blog')

@ApiBearerAuth("Authorization")
@UseGuards(authGuard)
export class BlogCommentController {
  constructor(private readonly BlogCommentService: BlogCommentService) {}

  @Post('/')
  @ApiConsumes(swaggerConsumes.UrlEncoded, swaggerConsumes.Json)
  create(@Body() createCommentDto: createCommentDto) {
    return this.BlogCommentService.createComment(createCommentDto);
  }

}
