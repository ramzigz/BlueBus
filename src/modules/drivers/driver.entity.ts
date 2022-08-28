import { Bus } from '../buses/bus.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
export type DriverGender = 'MALE' | 'FEMALE';

@Entity()
export class Driver {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({
    type: 'enum',
    enum: ['MALE', 'FEMALE'],
    default: 'MALE',
  })
  gender: DriverGender;

  @Column({ default: true })
  isActive: boolean;

  @OneToOne(() => Bus, (bus) => bus.driver) // specify inverse side as a second parameter
  bus: Bus;
}
