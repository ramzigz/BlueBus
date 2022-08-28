import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Bus } from 'src/modules/buses/bus.entity';
import { Driver } from 'src/modules/drivers/driver.entity';

const dbConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'root1234',
  database: 'blue_bus',
  entities: [Driver, Bus],
  synchronize: true,
  migrations: ['dist/db/migrations/*{.ts,.js}'],
  migrationsTableName: 'migrations_typeorm',
  migrationsRun: true,
};

export default dbConfig;
