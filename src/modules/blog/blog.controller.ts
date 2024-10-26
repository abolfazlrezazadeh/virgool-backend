import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { swaggerConsumes } from '../auth/enums/swagger-consumes.enum';
import { authGuard } from '../auth/guards/auth.guard';
import { paginationDecorator } from 'src/common/decorators/pagination.decorator';
import { paginationDto } from 'src/common/dto/pagination.dto';
import { skipAuth } from 'src/common/decorators/skipAuth.decorator';

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

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBlogDto: UpdateBlogDto) {
    return this.blogService.update(+id, updateBlogDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.blogService.remove(+id);
  }
}
