import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { v4 as uuidv4 } from 'uuid';
import { CreateUserDto } from './dto/create-user.dto';
import { DOCTOR_ROLE, PATIENT_ROLE } from 'src/utils/constants';

@Injectable()
export class UsersRepository {
  constructor(private prismaService: PrismaService) {}

  async create(dto: CreateUserDto, hashedPassword: string) {
    return this.prismaService.users.create({
      data: {
        id: uuidv4(),
        email: dto.email,
        password: hashedPassword,
        fullname: dto.fullname,
        role: dto.role,
        avatar: null
      }
    });
  }

  findAll(skip: number, count: number, query: string) {
    return this.prismaService.users.findMany({
      skip,
      take: count,
      where: {
        role: DOCTOR_ROLE
      }
    });
  }

  findAllDoctors(skip: number, count: number, query: string) {
    return this.prismaService.users.findMany({
      skip,
      take: count,
      where: {
        role: DOCTOR_ROLE,
        fullname: {
          contains: query,
          mode: 'insensitive'
        }
      }
    });
  }

  findAllPatients(doctorId: string, skip: number, count: number, query: string) {
    return this.prismaService.users.findMany({
      skip,
      take: count,
      where: {
        fullname: {
          contains: query,
          mode: 'insensitive'
        },
        NOT: {
          id: doctorId
        },
        patient: {
          some: {
            doctor_id: doctorId
          }
        }
      }
    });
  }

  totalCountDoctors(query: string) {
    return this.prismaService.users.count({
      where: {
        role: DOCTOR_ROLE,
        fullname: {
          contains: query,
          mode: 'insensitive'
        }
      }
    });
  }

  totalCountPatients(doctorId:string, query: string) {
    return this.prismaService.users.count({
      where: {
        fullname: {
          contains: query,
          mode: 'insensitive'
        },
        doctor: {
          some: {
            id: doctorId
          }
        }
      }
    });
  }

  totalCount(query: string) {
    return this.prismaService.users.count({
      where: {
        role: DOCTOR_ROLE
      }
    });
  }

  // findAllWithRighs(cardIds: string[]) {
  //   return this.prismaService.users.findMany({
  //     where: {
  //       rights: {
  //         some: {
  //           AND: cardIds.map((cardId) => ({
  //             card_id: cardId
  //           }))
  //         }
  //       }
  //     },
  //     include: {
  //       rights: true
  //     }
  //   });
  // }
  getUserByEmail(email: string) {
    return this.prismaService.users.findFirst({
      where: { email }
    });
  }

  findOne(id: string) {
    return this.prismaService.users.findFirst({
      where: { id },
      include: {}
    });
  }

  remove(id: string) {
    return this.prismaService.users.delete({
      where: { id }
    });
  }

  setAvatar(filename: string, id: string) {
    return this.prismaService.users.update({
      where: { id },
      data: {
        avatar: 'avatars/' + filename
      }
    });
  }

  // makeAdmin(id: string) {
  //   return this.prismaService.users.update({
  //     where: { id },
  //     data: {
  //       role: ADMIN_ROLE
  //     }
  //   });
  // }

  // changeRate(id: string, points: number) {
  //   return this.prismaService.users.update({
  //     where: { id },
  //     data: {
  //       rate: points
  //     }
  //   });
  // }
}
