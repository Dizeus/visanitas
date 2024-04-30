import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { FilesService } from '../files/files.service';
import { UsersRepository } from './users.repository';
import * as path from 'path';

@Injectable()
export class UsersService {
  constructor(
    private fileService: FilesService,
    private usersRepository: UsersRepository
  ) {}

  async create(dto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(dto.password, 10);
    return this.usersRepository.create(dto, hashedPassword);
  }

  async findAll(page: number, count: number, query: string) {
    const skip = (page - 1) * count;
    const [users, total] = await Promise.all([
      this.usersRepository.findAll(skip, count, query),
      this.usersRepository.totalCount(query)
    ]);

    return { users, total };
  }

  async findDoctors(page: number, count: number, query: string) {
    const skip = (page - 1) * count;
    const [doctors, total] = await Promise.all([
      this.usersRepository.findAllDoctors(skip, count, query),
      this.usersRepository.totalCountDoctors(query)
    ]);

    return { doctors, total };
  }

  async findPatients(id: string, page: number, count: number, query: string) {
    const skip = (page - 1) * count;
    const [patients, total] = await Promise.all([
      this.usersRepository.findAllPatients(id, skip, count, query),
      this.usersRepository.totalCountPatients(id, query)
    ]);

    return { patients, total };
  }

  async findOne(id: string) {
    const user = await this.usersRepository.findOne(id);

    if (!user) {
      throw new HttpException(
        `User with id: ${id} wasn't found`,
        HttpStatus.BAD_REQUEST
      );
    }

    return user;
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.usersRepository.remove(id);
  }

  setAvatar(image: any, id: string) {
    const filePath = path.resolve(
      __dirname,
      '..',
      '..',
      '..',
      'static',
      'avatars'
    );
    const filename = this.fileService.createFile(image, filePath);
    return this.usersRepository.setAvatar(filename, id);
  }
}
