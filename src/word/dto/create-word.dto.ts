import { Transform } from 'class-transformer';
import { IsBoolean, IsNotEmpty } from 'class-validator';

export class CreateWordDto {
  @IsNotEmpty()
  @Transform(({ value }) => value.toLowerCase())
  name: string;

  @IsNotEmpty()
  meaning: string;

  @IsNotEmpty()
  bookId: number;

  @IsBoolean()
  fixed: boolean;
}
