import { IsNumber, IsOptional, Min } from 'class-validator';

export class FindWordDto {
  @Min(3)
  @IsOptional()
  name?: string;

  @IsOptional()
  @IsNumber()
  bookId?: number;
}
