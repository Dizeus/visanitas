import {
  Put,
  Controller,
  Get,
  UseGuards,
  Req,
  Post,
  Body
} from '@nestjs/common';
import { UserDoctorService } from './user-doctor.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateUserDoctorDto } from './dto/create-user-doctor.dto';

@Controller('api/users-doctor')
export class UserDoctorController {
  constructor(private userDoctorService: UserDoctorService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Req() req, @Body() createUserDoctorDto: CreateUserDoctorDto) {
    return this.userDoctorService.create(req.user.id, createUserDoctorDto);
  }
}
