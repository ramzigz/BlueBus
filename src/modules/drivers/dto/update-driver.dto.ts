import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { Length, IsString, IsOptional, IsBoolean } from 'class-validator';
import { Gender } from '../../../shared/enum/gender';
import { DriverGender } from '../driver.entity';

export class UpdateDriverDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @Length(3, 60)
  readonly firstName: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @Length(3, 60)
  readonly lastName: string;

  @ApiPropertyOptional({
    description: 'Gender must be MALE or FEMALE',
    enum: Gender,
  })
  @IsOptional()
  @IsString()
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
