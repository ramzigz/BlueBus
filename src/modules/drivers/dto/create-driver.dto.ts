import { ApiProperty } from '@nestjs/swagger';
import { Length, IsString, IsNotEmpty, IsEnum } from 'class-validator';
import { Gender } from '../../../shared/enum/gender';
import { DriverGender } from '../driver.entity';

export class CreateDriverDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(3, 60)
  readonly firstName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(3, 60)
  readonly lastName: string;

  @ApiProperty({
    description: 'Gender must be MALE or FEMALE',
    enum: Gender,
  })
  @IsString()
  @IsNotEmpty()
  @IsEnum(Gender, {
    message: 'Gender must be MALE or FEMALE',
  })
  readonly gender: DriverGender;
}
