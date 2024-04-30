import { Module } from "@nestjs/common";
import { CommentsController } from "./comments.controller";
import { PrismaModule } from "../prisma/prisma.module";
import { AuthModule } from "../auth/auth.module";
import { CommentsRepository } from "./comments.repository";
import { CommentsService } from "./comments.service";

@Module({
  controllers: [CommentsController],
  providers: [CommentsService, CommentsRepository],
  imports: [PrismaModule, AuthModule],
  exports: [CommentsService, CommentsRepository],
})
export class CommentsModule {}
