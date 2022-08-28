import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bus } from './bus.entity';
import { CreateBusDto } from './dto/create-bus.dto';
import { BusDto } from './dto/bus.dto';
import { GroupBusDto } from './dto/group-buses.dto';
import { UpdateBusDto } from './dto/update-bus.dto';

@Injectable()
export class BusesService {
  constructor(
    @InjectRepository(Bus)
    private busRepository: Repository<Bus>,
  ) {}

  findAll(): Promise<Bus[]> {
    return this.busRepository.find({
      relations: {
        driver: true,
      },
    });
  }

  findOne(id: string): Promise<Bus> {
    return this.busRepository.findOne({
      where: { id },
      relations: ['driver'],
    });
  }

  async createBus(createBusDto: CreateBusDto) {
    return this.busRepository.save(createBusDto);
  }

  async remove(id: string): Promise<void> {
    await this.busRepository.delete(id);
  }

  async editBus(id: string, bus: UpdateBusDto): Promise<Bus> {
    const oldBus = await this.busRepository.findOneBy({ id });
    const payload = {
      number: bus.number || oldBus.number,
      driver: bus.driver || oldBus.driver,
      capacity: bus.capacity || oldBus.capacity,
      plate_number: bus.plate_number || oldBus.plate_number,
      IsInService:
        typeof bus.IsInService === 'boolean'
          ? bus.IsInService
          : oldBus.IsInService,
    };

    await this.busRepository.update(id, payload);

    return this.busRepository.findOne({
      where: { id },
      relations: ['driver'],
    });
  }
}
