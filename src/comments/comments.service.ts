import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentsRepository } from './comments.repository';

@Injectable()
export class CommentsService {
  constructor(private commentsRepository: CommentsRepository) {}

  async create(id: string, createCommentDto: CreateCommentDto) {
    const comment = await this.commentsRepository.create(id, createCommentDto);
    return { comment };
  }
}
