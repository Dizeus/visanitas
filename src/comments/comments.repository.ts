import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as uuid from 'uuid';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class CommentsRepository {
  constructor(private prismaService: PrismaService) {}

  create(id: string, createCommentDto: CreateCommentDto) {
    return this.prismaService.comments.create({
      data: {
        id: uuid.v4(),
        record_id: createCommentDto.recordId,
        author_id: id,
        text: createCommentDto.text,
        created_at: new Date().toISOString()
      }
    });
  }

  //findAll(userId: string, skip: number, count: number) {
  //  return this.prismaService.comments.findMany({
  //    skip,
  //    take: count,
  //    distinct: ['chat_id'],
  //    orderBy: {
  //      created_at: 'desc'
  //    },
  //    include: {
  //      chat: {
  //        include: {
  //          comments: true,
  //          users_chats: {
  //            include: {
  //              user: true
  //            }
  //          }
  //        }
  //      }
  //    },
  //    where: {
  //      chat: {
  //        users_chats: {
  //          some: {
  //            user_id: userId
  //          }
  //        }
  //      }
  //    }
  //  });
  //}
}
