import {Inject, Injectable, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { blogCommentsEntity } from '../entities/comments.entity';
import { BlogService } from './blog.service';
import { createCommentDto } from '../dto/blogComment.dto';
import { publicMessages } from 'src/modules/auth/enums/messages.enum';

@Injectable({ scope: Scope.REQUEST })
export class BlogCommentService {
  constructor(
    @InjectRepository(blogCommentsEntity) private BlogCommentRepository: Repository<blogCommentsEntity>,
    @Inject(REQUEST) private request: Request,
    private BlogService: BlogService

  ) { }

  async createComment(createCommentDto:createCommentDto){
    const {blogId,parentId,text} = createCommentDto
    const {id:userId} = this.request.user
    let parent = null
    const existBlog = await this.BlogService.findBlog(blogId)
    if(parentId && !isNaN(parentId)){
        parent = await this.BlogCommentRepository.findOneBy({id:parentId})
    }
    await this.BlogCommentRepository.insert({
        text,
        accepted: true,
        blogId,
        parentId: parent.id? parentId:null,
        userId
    })
    return {
        message : publicMessages.CreateComment
    }

  }

}
