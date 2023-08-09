import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ticket } from 'src/typeorm/entities/Ticket';
import { Seat } from 'src/typeorm/entities/Seat';
import { Event } from 'src/typeorm/entities/Event';
import { Customer } from 'src/typeorm/entities/Customer';
import { EventsService } from '../events/events.service';
import { SeatsService } from '../seats/seats.service';

@Injectable()
export class TicketsService {
  constructor(
    private eventsService: EventsService,
    private seatsService: SeatsService,
    @InjectRepository(Ticket) private ticketRepository: Repository<Ticket>,
  ) {}

  getAllTickets() {
    return this.ticketRepository.find();
  }

  createTicket(seat: Seat, event: Event, customer: Customer) {
    const newTicket = this.ticketRepository.create({
      seat: seat,
      event: event,
      customer: customer,
    });

    return this.ticketRepository.save(newTicket);
  }

  async getUserTicketsInfo(customer: Customer) {
    return await this.ticketRepository.find({
      where: {
        customer: customer,
      },
      relations: ['customer', 'seat', 'event'],
    });
  }
}
