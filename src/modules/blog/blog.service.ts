import { Inject, Injectable, Scope } from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BlogEntity } from './entities/blog.entity';
import { Repository } from 'typeorm';
import { createSlug } from 'src/common/utils/functions.util';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { blogStatus } from './enums/status.enum';

@Injectable({ scope: Scope.REQUEST })
export class BlogService {
  constructor(
    @InjectRepository(BlogEntity) private blogRepository: Repository<BlogEntity>,
    @Inject(REQUEST) private request: Request

  ) { }
  async create(createBlogDto: CreateBlogDto) {
    const user = this.request.user
    let { title, slug, content, description, image, timeToRead } = createBlogDto
    let slugData = title ?? slug
    slug = createSlug(slugData)
    const blog = this.blogRepository.create({
      title,
      slug,
      content,
      description,
      image,
      timeToRead,
      status: blogStatus.Draft,
      authorId: user.id
    })
    await this.blogRepository.save(blog)
    return {
      message :"blog created successfully"
    }

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
