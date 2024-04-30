import { IsUUID } from 'class-validator';

export class CreateUserDoctorDto {
  @IsUUID('all', { message: 'Must be a doctor ID' })
  readonly doctorId: string;
}
