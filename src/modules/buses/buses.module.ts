import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BusesService } from './buses.service';
import { BusesController } from './buses.controller';
import { Bus } from './bus.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Bus])],
  providers: [BusesService],
  controllers: [BusesController],
})
export class BusesModule {}
