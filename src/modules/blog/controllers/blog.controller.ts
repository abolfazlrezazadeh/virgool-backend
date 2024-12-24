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

@Controller('blog')
@ApiTags('Blog')

@ApiBearerAuth("Authorization")
@UseGuards(authGuard)
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Post('/')
  @ApiConsumes(swaggerConsumes.UrlEncoded, swaggerConsumes.Json)
  create(@Body() createBlogDto: CreateBlogDto) {
    return this.blogService.create(createBlogDto);
  }

  @Get('/my-blogs')
  getUserBlog() {
    return this.blogService.getUserBlog();
  }

  @Get('/')
  @skipAuth()
  @paginationDecorator()
  findBlogs(@Query() paginationDto:paginationDto ) {
    return this.blogService.findAll(paginationDto);
  }

  @Get('/category')
  @skipAuth()
  @paginationDecorator()
  @filterBlog()
  findBlogsByCategory(@Query() paginationDto:paginationDto,@Query() filterDto:filterBlogDto ) {
    return this.blogService.findAllInCategory(paginationDto,filterDto);
  }

  @Put(':id')
  @ApiConsumes(swaggerConsumes.UrlEncoded, swaggerConsumes.Json)
  update(@Param('id',ParseIntPipe) id: Number, @Body() updateBlogDto: UpdateBlogDto) {
    return this.blogService.update(+id, updateBlogDto);
  }

  @Get('like/:id')
  @ApiConsumes(swaggerConsumes.UrlEncoded, swaggerConsumes.Json)
  likeBlog(@Param('id',ParseIntPipe) id: Number) {
    return this.blogService.likeBlog(+id);
  }

  @Get('bookmark/:id')
  @ApiConsumes(swaggerConsumes.UrlEncoded, swaggerConsumes.Json)
  bookmarkBlog(@Param('id',ParseIntPipe) id: Number) {
    return this.blogService.bookmarkBlog(+id);
  }

  @Delete('delete/:id')
  remove(@Param('id',ParseIntPipe) id: number) {
    return this.blogService.remove(id);
  }
}
