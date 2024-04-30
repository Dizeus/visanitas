import { IsString, IsDate, IsNumber } from "class-validator";

export class CreateRecordDto {
  @IsDate({ message: 'Must be a date' })
  readonly time: Date;
  @IsNumber({}, { message: 'Must be a number' })
  readonly blPressureTop: number;
  @IsNumber({}, { message: 'Must be a number' })
  readonly blPressureBottom: number;
  @IsNumber({}, { message: 'Must be a number' })
  readonly wellBeing: number;
  @IsNumber({}, { message: 'Must be a number' })
  readonly activity: number;
  @IsString({ message: 'Must be a string' })
  readonly meal: string;
  @IsString({ message: 'Must be a string' })
  readonly note: string;
}
