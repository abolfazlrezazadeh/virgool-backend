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
import { publicMessages } from '../auth/enums/messages.enum';
import { BlogLikesEntity } from './entities/likes.entity';

@Injectable({ scope: Scope.REQUEST })
export class BlogService {
  constructor(
    @InjectRepository(BlogEntity) private blogRepository: Repository<BlogEntity>,
    @InjectRepository(BlogCategoryEntity) private blogCategoryRepository: Repository<BlogCategoryEntity>,
    @InjectRepository(BlogLikesEntity) private bloglikeRepository: Repository<BlogLikesEntity>,
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
      message: publicMessages.Created
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
      .addSelect(["categories.id", "categories.title"])
      .loadRelationCountAndMap("blog.likes","blog.likes");

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

  async update(id: number, updateBlogDto: UpdateBlogDto) {
    const user = this.request.user
    let { title, slug, content, description, image, timeToRead, categories } = updateBlogDto
    // find blog
    let blog = await this.findBlog(id)
    // convert string to array
    if (!isArray(categories) && typeof categories === "string") {
      //swagger sends array like this => category0,category1
      categories = categories.split(",")
    } else if (!categories) {
      categories = []
    }
    let slugData;


    if (title) {
      slugData = title
      blog.title = title
    }
    if (slug) slugData = slug
    if (slugData) {
      slug = createSlug(slugData)
      const isExist = await this.checkBlogBySlug(slug)
      if (isExist && isExist.id !== id) {
        slug += `-${randomId()}`
      }
      blog.slug = slug
    }
    if (content) blog.content = content
    if (description) blog.description = description
    if (image) blog.image = image
    if (timeToRead) blog.timeToRead = timeToRead
    // update blog
    blog = await this.blogRepository.save(blog)
    // create category
    for (const categoryTitle of categories) {
      let category = await this.categoryService.findOneByTitle(title)
      if (!category) {
        category = await this.categoryService.insertByTitle(categoryTitle)
      }
      const findCategoryExistInBlog = await this.blogCategoryRepository.findOneBy({ categoryId: category.id, blogId: blog.id })
      // if category doesnt exist insert new categories
      if (!findCategoryExistInBlog) {
        await this.blogCategoryRepository.insert({
          blogId: blog.id,
          categoryId: category.id
        })
      }
    }

    return {
      message: publicMessages.Updated
    }

  }

  async likeBlog(blogId:number){
    const {id:userId} = this.request.user
    const existBlog = await this.findBlog(blogId)
    const likedBLog = await this.bloglikeRepository.findOneBy({blogId,userId})
    if(likedBLog){
      await this.bloglikeRepository.delete({id:likedBLog.id})
      return {
        message: publicMessages.Unliked
      }
    }else{
      await this.bloglikeRepository.insert({
        blogId,
        userId
      })
      return {
        message: publicMessages.liked
      }
    }
    
  }

  async remove(id: number) {
    const findBlog = await this.findBlog(id)
    // delete blog

    const deletedBlog = await this.blogRepository.delete({ id })
    if (deletedBlog.affected > 0)
      return {
        message: publicMessages.Deleted
      }
    return {
      message: publicMessages.CatchError
    }
  }
  async findBlog(id: number): Promise<BlogEntity> {
    const findBlog = await this.blogRepository.findOneBy({ id })
    if (!findBlog)
      throw new Error(publicMessages.DoesntExist);
    return findBlog
  }
  async checkBlogBySlug(slug: string): Promise<BlogEntity> {
    const blog = await this.blogRepository.findOneBy({ slug })
    // if exist return true
    return blog
  }
  async deleteEmptyInput(UpdateBlogDto: UpdateBlogDto) {
    const nullishData: (string | number | null | undefined)[] = ["", " ", "   ", 0, null, undefined, "0"]
    Object.keys(UpdateBlogDto).forEach((key: string) => {
      if (UpdateBlogDto[key] === null || UpdateBlogDto[key] === undefined || UpdateBlogDto[key].trim() === "" || nullishData.includes(key)) {
        delete UpdateBlogDto[key]
      }
    })
    return UpdateBlogDto
  }
}
