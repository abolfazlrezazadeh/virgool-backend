import { BadRequestException, ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from './entities/category.entity';
import { Repository } from 'typeorm';
import { publicMessages } from '../auth/enums/messages.enum';

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

  findAll() {
    const categories = this.categoryRepository.find() 
    return categories;
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
