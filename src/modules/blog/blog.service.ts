import { BadRequestException, Inject, Injectable, Scope } from '@nestjs/common';
import { CreateBlogDto, filterBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BlogEntity } from './entities/blog.entity';
import { FindOptionsWhere, Repository } from 'typeorm';
import { createSlug, randomId } from 'src/common/utils/functions.util';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { blogStatus } from './enums/status.enum';
import { paginationDto } from '../../common/dto/pagination.dto';
import { paginationResponse, paginationSolver } from 'src/common/utils/pagination.util';
import { isArray } from 'class-validator';
import { CategoryService } from '../category/category.service';
import { BlogCategoryEntity } from './entities/blog-category.entity';
import { entityName } from 'src/common/enums/entityNames.enum';

@Injectable({ scope: Scope.REQUEST })
export class BlogService {
  constructor(
    @InjectRepository(BlogEntity) private blogRepository: Repository<BlogEntity>,
    @InjectRepository(BlogCategoryEntity) private blogCategoryRepository: Repository<BlogCategoryEntity>,
    @Inject(REQUEST) private request: Request,
    private categoryService: CategoryService

  ) { }
  async create(createBlogDto: CreateBlogDto) {
    const user = this.request.user
    let { title, slug, content, description, image, timeToRead, categories } = createBlogDto
    // convert string to array
    if (!isArray(categories) && typeof categories === "string") {
      categories = categories.split(",")
    } else if (!categories) {
      categories = []
    }
    let slugData = title ?? slug
    slug = createSlug(slugData)
    const isExist = await this.checkBlogBySlug(slug)
    if (isExist) {
      slug += `-${randomId()}`
    }
    // create blog
    let blog = this.blogRepository.create({
      title,
      slug,
      content,
      description,
      image,
      timeToRead,
      status: blogStatus.Draft,
      authorId: user.id
    })
    blog = await this.blogRepository.save(blog)
    // create category
    for (const categoryTitle of categories) {
      let category = await this.categoryService.findOneByTitle(title)
      if (!category) {
        category = await this.categoryService.insertByTitle(categoryTitle)
      }
      await this.blogCategoryRepository.insert({
        blogId: blog.id,
        categoryId: category.id
      })
    }

    return {
      message: "blog created successfully"
    }

  }

  async getUserBlog() {
    const user = this.request.user
    const blogs = await this.blogRepository.find({
      where: {
        authorId: user.id
      },
      order: {
        id: "DESC"
      }
    })
    return blogs
  }

  async findAll(paginationDto: paginationDto) {
    const { limit, page, skip } = paginationSolver(paginationDto)
    const [blogs, count] = await this.blogRepository.find({
      where: {
      },
      order: {
        id: "DESC"
      },
      skip,
      take: limit
    })
    return {
      pagination: paginationResponse(page, limit, +count),
      blogs

    }
  }
  async findAllInCategory(paginationDto: paginationDto, filterDto: filterBlogDto) {
    const { limit, page, skip } = paginationSolver(paginationDto);
    const { category, search } = filterDto;
  
    const queryBuilder = this.blogRepository.createQueryBuilder(entityName.Blog)
      .leftJoin("blog.categories", "categories")
      .leftJoin("categories.category", "category")
      .addSelect(["categories.id", "categories.title"]);
  
    // Filter by category
    if (category) {
      queryBuilder.andWhere("LOWER(category.title) = :category", { category: category.toLowerCase() });
    }
  
    // Filter by search
    if (search) {
      queryBuilder.andWhere(
        "(LOWER(blog.title) LIKE :search OR LOWER(blog.content) LIKE :search OR LOWER(blog.description) LIKE :search)",
        { search: `%${search.toLowerCase()}%` }
      );
    }
  
    // Pagination and ordering
    queryBuilder.orderBy("blog.id", "DESC").skip(skip).take(limit);
  
    // Execute query
    const [blogs, count] = await queryBuilder.getManyAndCount();
  
    return {
      pagination: paginationResponse(page, limit, count),
      blogs,
    };
  }
  

  update(id: number, updateBlogDto: UpdateBlogDto) {
    return `This action updates a #${id} blog`;
  }

  remove(id: number) {
    return `This action removes a #${id} blog`;
  }
  async checkBlogBySlug(slug: string) {
    const blog = await this.blogRepository.findOneBy({ slug })
    // if exist return true
    return !!blog
  }
}
