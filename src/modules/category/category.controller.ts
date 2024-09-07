import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ApiConsumes, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { swaggerConsumes } from '../auth/enums/swagger-consumes.enum';
import { paginationDto } from 'src/common/dto/pagination.dto';
import { paginationDecorator } from 'src/common/decorators/pagination.decorator';

@Controller('category')
@ApiTags('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @ApiConsumes(swaggerConsumes.UrlEncoded,swaggerConsumes.Json)
  // @ApiResponse({ status: 201, description: 'The record has been successfully created.'})
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @Get()
  @paginationDecorator()
  findAll(@Query() paginationDto:paginationDto) {
    return this.categoryService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoryService.update(+id, updateCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryService.remove(+id);
  }
}
