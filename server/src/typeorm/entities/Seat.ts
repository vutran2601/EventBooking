import {
  Column,
  Entity,
  OneToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Seatmap } from './Seatmap';

@Entity({ name: 'seat', schema: 'eventbooking' })
export class Seat {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  seatPos: number;

  @Column()
  seatType: string;

  @Column({ default: 'available' })
  status: string;

  @ManyToOne(() => Seatmap, (seatmap) => seatmap.seat)
  seatmap: Seatmap;
}
