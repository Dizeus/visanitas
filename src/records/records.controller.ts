import { Controller, Post, Body, UseGuards, Req, Get, Query } from "@nestjs/common";
import { RecordsService } from "./records.service";
import { CreateRecordDto } from "./dto/create-record.dto";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";

@Controller('api/records')
export class RecordsController {
  constructor(private readonly recordsService: RecordsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Req() req, @Body() createRecordDto: CreateRecordDto) {
    return this.recordsService.create(req.user.id, createRecordDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  getRecords(
    @Req() req,
    @Query('count') count: number = 10,
    @Query('page') page: number = 1
  ) {
    return this.recordsService.findAll(req.user.id, page, count);
  }

  @Get('patient')
  @UseGuards(JwtAuthGuard)
  getPatientRecords(
    @Req() req,
    @Query('count') count: number = 10,
    @Query('page') page: number = 1,
    @Query('patientId') patientId: string
  ) {
    return this.recordsService.findPatientAll(req.user.id, page, count, patientId);
  }
}
