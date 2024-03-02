import { IsNumber, IsOptional } from 'class-validator';

export class FindWordDto {
  @IsOptional()
  name?: string;

  @IsOptional()
  @IsNumber()
  bookId?: number;
}
