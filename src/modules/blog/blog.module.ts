import { Module } from '@nestjs/common';
import { BlogService } from './services/blog.service';
import { BlogController } from './controllers/blog.controller';
import { AuthModule } from '../auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogEntity } from './entities/blog.entity';
import { CategoryService } from '../category/category.service';
import { CategoryEntity } from '../category/entities/category.entity';
import { BlogCategoryEntity } from './entities/blog-category.entity';
import { BlogLikesEntity } from './entities/likes.entity';
import { BlogBookmarkEntity } from './entities/bookmarks.entity';
import { BlogCommentService } from './services/blogComment.service';
import { blogCommentsEntity } from './entities/comments.entity';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([
      BlogEntity,
      CategoryEntity,
      BlogCategoryEntity,
      BlogLikesEntity,
      BlogBookmarkEntity,
      blogCommentsEntity
    ])],
  controllers: [BlogController],
  providers: [BlogService, CategoryService,BlogCommentService],
})
export class BlogModule { }
