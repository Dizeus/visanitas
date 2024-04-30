import { Module } from "@nestjs/common";
import { RecordsService } from "./records.service";
import { RecordsController } from "./records.controller";
import { PrismaModule } from "../prisma/prisma.module";
import { RecordsRepository } from "./records.repository";
import { AuthModule } from "../auth/auth.module";

@Module({
  controllers: [RecordsController],
  providers: [RecordsService, RecordsRepository],
  imports: [PrismaModule, AuthModule],
  exports: [RecordsService, RecordsRepository],
})
export class RecordsModule {}
