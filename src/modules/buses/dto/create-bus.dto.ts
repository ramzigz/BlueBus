import { ApiProperty } from '@nestjs/swagger';
import {
  Length,
  IsString,
  IsNotEmpty,
  IsEnum,
  IsNumber,
} from 'class-validator';
import { Gender } from '../../../shared/enum/gender';

export class CreateBusDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  // @Length(3, 4)
  readonly number: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  // @Length(2, 3)
  readonly capacity: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(3, 10)
  readonly plate_number: string;
}
