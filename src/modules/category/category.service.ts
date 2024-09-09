import { BadRequestException, ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from './entities/category.entity';
import { Repository } from 'typeorm';
import { CategoryMessages, publicMessages } from '../auth/enums/messages.enum';
import { paginationDto } from 'src/common/dto/pagination.dto';
import { paginationResponse, paginationSolver } from 'src/common/utils/pagination.util';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private categoryRepository: Repository<CategoryEntity>,
  ) { }
  async create(createCategoryDto: CreateCategoryDto) {
    let { title, priority } = createCategoryDto;
    title = await this.checkExistCategory(title)
    const category = this.categoryRepository.create({
      title,
      priority
    })
    await this.categoryRepository.save(category)
    return {
      message: publicMessages.Created
    }
  }

  async checkExistCategory(title: string): Promise<string> {
    title = title.trim()
    const foundedCategoy = await this.categoryRepository.findOneBy({ title })
    if (foundedCategoy) throw new BadRequestException(publicMessages.AlreadyExist)
    return title
  }

  async findAll(paginationDto: paginationDto) {
    let { page, skip, limit } = paginationSolver(paginationDto)
    const [categories, count] = await this.categoryRepository.findAndCount({
      where: {},
      skip: skip,
      take: limit
    })
    return {
      pagination: paginationResponse(page, limit, count),
      categories
    }
  }

  async findOne(id: number) {
    const category = await this.categoryRepository.findOneBy({ id })
    if (!category) throw new BadRequestException(CategoryMessages.CategoryNotFound)
    return category
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    let category = await this.findOne(id)
    const { title, priority } = updateCategoryDto
    if(title) category.title = title
    if(priority) category.priority = priority
    category = await this.categoryRepository.save(category,{ reload: true})
    return {
      message: CategoryMessages.Updated,
      category
    }
  }

  async remove(id: number) {
    await this.findOne(id)
    await this.categoryRepository.delete(id)
    return {
      message: CategoryMessages.Deleted
    }
  }
}
