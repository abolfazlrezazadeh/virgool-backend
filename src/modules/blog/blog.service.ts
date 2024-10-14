import { Injectable } from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BlogEntity } from './entities/blog.entity';
import { Repository } from 'typeorm';
import { createSlug } from 'src/common/utils/functions.util';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(BlogEntity) private blogRepository: Repository<BlogEntity>
  ) { }
  create(createBlogDto: CreateBlogDto) {
    let { title, slug } = createBlogDto
    let slugData = slug ?? title
    createBlogDto.slug = createSlug(slugData)
    return createBlogDto;
  }

  findAll() {
    return `This action returns all blog`;
  }

  findOne(id: number) {
    return `This action returns a #${id} blog`;
  }

  update(id: number, updateBlogDto: UpdateBlogDto) {
    return `This action updates a #${id} blog`;
  }

  remove(id: number) {
    return `This action removes a #${id} blog`;
  }
}
