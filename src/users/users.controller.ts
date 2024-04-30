import {
  Put,
  Controller,
  Get,
  UseGuards,
  Delete,
  UploadedFile,
  UseInterceptors,
  Query,
  Req
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('api/users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  getAll(
    @Query('page') page: number = 1,
    @Query('count') count: number = 10,
    @Query('query') query: string = ''
  ) {
    return this.usersService.findAll(+page, +count, query);
  }

  @Get('doctors')
  getDoctors(
    @Query('page') page: number = 1,
    @Query('count') count: number = 10,
    @Query('query') query: string = ''
  ) {
    return this.usersService.findDoctors(+page, +count, query);
  }

  @Get('patients')
  @UseGuards(JwtAuthGuard)
  getPatients(
    @Req() req,
    @Query('page') page: number = 1,
    @Query('count') count: number = 10,
    @Query('query') query: string = ''
  ) {
    return this.usersService.findPatients(req.user.id, +page, +count, query);
  }

  @Put('/avatar')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('image'))
  setAvatar(@Req() req, @UploadedFile() image) {
    return this.usersService.setAvatar(image, req.user.id);
  }

  @Delete()
  @UseGuards(JwtAuthGuard)
  deleteSelf(@Req() req) {
    return this.usersService.remove(req.user.id);
  }
}
