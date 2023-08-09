import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Ticket } from './Ticket';

@Entity({ name: 'customer', schema: 'event booking' })
export class Customer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  fullName: string;

  @Column()
  email: string;

  @Column({ default: false })
  status: boolean;

  @OneToMany(() => Ticket, (ticket) => ticket.customer)
  tickets: Ticket[];
}
