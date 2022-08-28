import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Driver } from './driver.entity';
import { CreateDriverDto } from './dto/create-driver.dto';
import { DriverDto } from './dto/driver.dto';
import { GroupDriversDto } from './dto/group-drivers.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';

@Injectable()
export class DriversService {
  constructor(
    @InjectRepository(Driver)
    private driversRepository: Repository<Driver>,
  ) {}

  findAll(driver: GroupDriversDto): Promise<Driver[]> {
    const filters = {
      ...(driver.gender && { gender: driver.gender }),
      isActive: driver.isActive,
    };
    return this.driversRepository.find({
      where: filters,
      relations: {
        bus: true,
      },
    });
  }

  async findOne(id: string): Promise<Driver> {
    return this.driversRepository.findOne({
      where: { id },
      relations: ['bus'],
    });
  }

  async createDriver(createDriverDto: CreateDriverDto) {
    return this.driversRepository.save(createDriverDto);
  }

  async remove(id: string): Promise<void> {
    await this.driversRepository.delete(id);
  }

  async editDriver(id: string, driver: UpdateDriverDto): Promise<Driver> {
    const oldDriver = await this.driversRepository.findOneBy({ id });

    const payload = {
      firstName: driver.firstName || oldDriver.firstName,
      lastName: driver.lastName || oldDriver.lastName,
      isActive:
        typeof driver.isActive === 'boolean'
          ? driver.isActive
          : oldDriver.isActive,
    };

    await this.driversRepository.update(id, payload);

    return this.driversRepository.findOne({
      where: { id },
      relations: ['bus'],
    });
  }
}
