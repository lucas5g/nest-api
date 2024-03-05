import { PartialType } from '@nestjs/mapped-types';
import { CreateFiiDto } from './create-fii.dto';

export class UpdateFiiDto extends PartialType(CreateFiiDto) {}
