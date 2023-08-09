import {
  Column,
  Entity,
  OneToOne,
  OneToMany,
  JoinColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Ticket } from './Ticket';
import { Seatmap } from './Seatmap';

@Entity({ name: 'event', schema: 'event booking' })
export class Event {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  price: number;

  @Column()
  eventType: string;

  @Column()
  eventDate: string;

  @Column()
  location: string;

  @Column()
  posterImg: string;

  @Column()
  createTime: Date;

  @Column({ default: 'unpublish' })
  status: string;

  @OneToOne(() => Seatmap)
  @JoinColumn()
  seatmap: Seatmap;

  @OneToMany(() => Ticket, (ticket) => ticket.event)
  tickets: Ticket[];
}
