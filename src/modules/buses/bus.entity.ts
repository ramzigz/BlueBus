import { Driver } from '../drivers/driver.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Bus {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  number: number;

  @Column()
  capacity: number;

  @Column()
  plate_number: string;

  @Column({ default: true })
  IsInService: boolean;

  @OneToOne(() => Driver, (driver) => driver.bus) // specify inverse side as a second parameter
  @JoinColumn()
  driver: Driver
}
