import { IsBoolean, IsNotEmpty } from 'class-validator';

export class CreateWordDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  meaning: string;

  @IsNotEmpty()
  book: string;

  @IsBoolean()
  fixed: boolean;
}
