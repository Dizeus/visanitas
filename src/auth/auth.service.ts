import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException
} from '@nestjs/common';
import { LoginAuthDto } from './dto/login-auth.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { users } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { UsersRepository } from '../users/users.repository';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
    private userRepository: UsersRepository
  ) {}

  async login(loginAuthDto: LoginAuthDto) {
    const user = await this.validateUser(loginAuthDto);
    return this.generateToken(user);
  }

  async registration(createUserDto: CreateUserDto) {
    const candidateEmail = await this.userRepository.getUserByEmail(
      createUserDto.email
    );

    if (candidateEmail) {
      throw new HttpException(
        `User with email: ${createUserDto.email} already exist`,
        HttpStatus.BAD_REQUEST
      );
    }

    const newUser = await this.userService.create(createUserDto);
    return this.generateToken(newUser);
  }

  async refresh(id: string) {
    const user = await this.userRepository.findOne(id);
    return this.generateToken(user);
  }

  generateToken(user: users) {
    const payload = { email: user.email, id: user.id, role: user.role };
    return {
      token: this.jwtService.sign(payload),
      user
    };
  }

  async validateUser(loginDto: LoginAuthDto) {
    const user = await this.userRepository.getUserByEmail(loginDto.email);
    const isPassword =
      user && (await bcrypt.compare(loginDto.password, user.password));

    if (!user || !isPassword) {
      throw new UnauthorizedException({
        message: `Incorrect ${user ? 'password' : 'email'}`
      });
    }

    return user;
  }
}
