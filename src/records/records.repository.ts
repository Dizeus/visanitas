import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import * as uuid from "uuid";
import { CreateRecordDto } from "./dto/create-record.dto";

@Injectable()
export class RecordsRepository {
  constructor(private prismaService: PrismaService) {}

  create(id: string, createRecordDto: CreateRecordDto) {
    return this.prismaService.records.create({
      data: {
        id: uuid.v4(),
        author_id: id,
        time: createRecordDto.time,
        bl_pressure_top: createRecordDto.blPressureTop,
        bl_pressure_bottom: createRecordDto.blPressureBottom,
        well_being: createRecordDto.wellBeing,
        activity: createRecordDto.activity,
        meal: createRecordDto.meal,
        note: createRecordDto.note
      }
    });
  }

  findAll(userId: string, skip: number, count: number) {
    return this.prismaService.records.findMany({
      skip,
      take: count,
      orderBy: {
        time: 'desc'
      },
      where: {
        author_id: userId
      }
    });
  }

  findPatientAll(doctorId: string, skip: number, count: number, patientId: string) {
    return this.prismaService.records.findMany({
      skip,
      take: count,
      orderBy: {
        time: 'desc'
      },
      where: {
        author_id: patientId,
        author: {
          patient: {
            some: {
              doctor_id: doctorId
            }
          }
        }
      }
    });
  }

  totalCount(id: string) {
    return this.prismaService.records.count({
      where: {
        author_id: id
      }
    });
  }
}
