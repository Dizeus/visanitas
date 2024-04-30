import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserDoctorDto } from './dto/create-user-doctor.dto';
import { UserDoctorRepository } from './user-doctor.repository';

@Injectable()
export class UserDoctorService {
  constructor(
    private userDoctorRepository: UserDoctorRepository
  ) {}

  async create(id: string, dto: CreateUserDoctorDto) {
    return this.userDoctorRepository.create(id, dto);
  }

  async remove(id: string) {
    return this.userDoctorRepository.remove(id);
  }
}
