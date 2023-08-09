import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Seat } from './Seat';

@Entity({ name: 'seatmap', schema: 'event booking' })
export class Seatmap {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: true })
  status: boolean;

  @OneToMany(() => Seat, (seat) => seat.seatmap)
  seat: Seat[];
}
