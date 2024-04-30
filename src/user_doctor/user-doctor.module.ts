import { Module } from '@nestjs/common';
import { UserDoctorController } from './user-doctor.controller';
import { UserDoctorService } from './user-doctor.service';
import { PrismaModule } from '../prisma/prisma.module';
import { UserDoctorRepository } from './user-doctor.repository';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [UserDoctorController],
  providers: [UserDoctorService, UserDoctorRepository]
})
export class UserDoctorModule {}
