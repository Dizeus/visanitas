import { IsEmail, IsString, Length } from 'class-validator';

export class LoginAuthDto {
  @IsEmail({}, { message: 'Incorrect Email' })
  readonly email: string;
  @IsString({ message: 'Must be a string' })
  @Length(4, 16, { message: 'Length must be grater than 4 and less than 16' })
  readonly password: string;
}
