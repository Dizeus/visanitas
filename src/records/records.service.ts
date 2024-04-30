import { Injectable } from "@nestjs/common";
import { CreateRecordDto } from "./dto/create-record.dto";
import { RecordsRepository } from "./records.repository";

@Injectable()
export class RecordsService {
  constructor(private recordsRepository: RecordsRepository) {}

  async create(id: string, createRecordDto: CreateRecordDto) {
    const record = await this.recordsRepository.create(id, createRecordDto);
    return { record };
  }

  async findAll(id: string, page: number, count: number) {
    const skip = (page - 1) * count;
    const [records, total] = await Promise.all([
      this.recordsRepository.findAll(id, skip, count),
      this.recordsRepository.totalCount(id)
    ]);

    return { records, total };
  }

  async findPatientAll(id: string, page: number, count: number, patientId: string) {
    const skip = (page - 1) * count;
    const [records, total] = await Promise.all([
      this.recordsRepository.findPatientAll(id, skip, count, patientId),
      this.recordsRepository.totalCount(patientId)
    ]);

    return { records, total };
  }
}
