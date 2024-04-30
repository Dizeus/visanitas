import { IsEmail, IsIn, IsString, Length } from 'class-validator';
import { DOCTOR_ROLE, PATIENT_ROLE } from '../../utils/constants';

export class CreateUserDto {
  @IsEmail({}, { message: 'Incorrect Email' })
  readonly email: string;
  @IsString({ message: 'Must be a string' })
  @Length(4, 16, { message: 'Length must be grater than 4 and less than 16' })
  readonly password: string;
  @IsString({ message: 'Must be a string' })
  @Length(4, 50, { message: 'Length must be grater than 4 and less than 50' })
  readonly fullname: string;
  @IsString({ message: 'Must be a string' })
  @IsIn([DOCTOR_ROLE, PATIENT_ROLE])
  readonly role: string;
}
