import {
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Event } from './Event';
import { Seat } from './Seat';
import { Customer } from './Customer';

@Entity({ name: 'ticket', schema: 'event booking' })
export class Ticket {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: false })
  status: boolean;

  @ManyToOne(() => Event, (event) => event.tickets)
  event: Event;

  @OneToOne(() => Seat)
  @JoinColumn()
  seat: Seat;

  @ManyToOne(() => Customer, (customer) => customer.tickets)
  customer: Customer;
}
