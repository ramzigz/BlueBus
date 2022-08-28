import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { DriversModule } from './modules/drivers/drivers.module';
import { BusesModule } from './modules/buses/buses.module';
import dbConfig from './db/config';

@Module({
  imports: [TypeOrmModule.forRoot(dbConfig), DriversModule, BusesModule],
})
export class AppModule {}
