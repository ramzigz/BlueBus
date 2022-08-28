import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsBoolean } from 'class-validator';
import { Driver } from '../../drivers/driver.entity';
import { Bus } from '../bus.entity';

export class BusDto {
  @ApiProperty()
  readonly id: string;

  @ApiProperty()
  readonly driver: Driver;

  @ApiProperty()
  readonly number: number;

  @ApiProperty()
  readonly capacity: number;

  @ApiProperty()
  readonly plate_number: string;

  @ApiProperty()
  @IsBoolean()
  @Transform(({ value }) => {
    if (value === 'true') return true;
    if (value === 'false') return false;
    return value;
  })
  readonly IsInService: boolean;

  constructor(bus: Bus) {
    this.id = bus.id;
    this.number = bus.number;
    this.plate_number = bus.plate_number;
    this.IsInService = bus.IsInService;
    this.driver = bus.driver;
  }
}
