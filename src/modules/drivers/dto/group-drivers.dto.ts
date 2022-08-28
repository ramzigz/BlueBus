import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsBoolean, IsEnum, IsOptional } from 'class-validator';
import { Gender } from '../../../shared/enum/gender';
import { Driver, DriverGender } from '../driver.entity';

export class GroupDriversDto {
  @ApiPropertyOptional({
    description: 'Gender must be MALE or FEMALE',
    enum: Gender,
  })
  @IsOptional()
  @IsEnum(Gender, {
    message: 'Gender must be MALE or FEMALE',
  })
  readonly gender: DriverGender;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => {
    if (value === 'true') return true;
    if (value === 'false') return false;
    return value;
  })
  readonly isActive: boolean;
}
