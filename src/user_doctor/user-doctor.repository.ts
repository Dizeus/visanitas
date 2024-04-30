import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { v4 as uuidv4 } from 'uuid';
import { CreateUserDoctorDto } from './dto/create-user-doctor.dto';

@Injectable()
export class UserDoctorRepository {
  constructor(private prismaService: PrismaService) {}

  async create(id: string, dto: CreateUserDoctorDto) {
    return this.prismaService.user_doctor.create({
      data: {
        id: uuidv4(),
        patient_id: id,
        doctor_id: dto.doctorId,
      }
    });
  }


  remove(id: string) {
    return this.prismaService.user_doctor.delete({
      where: { id }
    });
  }
}
