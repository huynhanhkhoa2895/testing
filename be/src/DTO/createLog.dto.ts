import { IsNotEmpty } from 'class-validator';

export class CreateLogDto {
  @IsNotEmpty()
  content : string
}