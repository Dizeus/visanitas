import { IsUUID, IsString } from "class-validator";
export class CreateCommentDto {
  @IsString({ message: 'Must be a string' })
  readonly text: string;
  @IsUUID('all', { message: 'Must be a record ID' })
  readonly recordId: string;
}
