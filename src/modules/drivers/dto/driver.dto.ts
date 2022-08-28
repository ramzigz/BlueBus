import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsBoolean } from 'class-validator';
import { Bus } from '../../buses/bus.entity';
import { Driver, DriverGender } from '../driver.entity';

export class DriverDto {
  @ApiProperty()
  readonly id: string;

  @ApiProperty()
  readonly firstName: string;

  @ApiProperty()
  readonly lastName: string;

  @ApiProperty()
  readonly gender: DriverGender;

  @ApiProperty()
  @IsBoolean()
  @Transform(({ value }) => {
    if (value === 'true') return true;
    if (value === 'false') return false;
    return value;
  })
  readonly isActive: boolean;

  constructor(driver: Driver) {
    this.id = driver.id;
    this.firstName = driver.firstName;
    this.lastName = driver.lastName;
    this.isActive = driver.isActive;
  }
}
