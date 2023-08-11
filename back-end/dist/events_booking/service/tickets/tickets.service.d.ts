import { Repository } from 'typeorm';
import { Ticket } from 'src/typeorm/entities/Ticket';
import { Seat } from 'src/typeorm/entities/Seat';
import { Event } from 'src/typeorm/entities/Event';
import { Customer } from 'src/typeorm/entities/Customer';
import { EventsService } from '../events/events.service';
import { SeatsService } from '../seats/seats.service';
export declare class TicketsService {
    private eventsService;
    private seatsService;
    private ticketRepository;
    constructor(eventsService: EventsService, seatsService: SeatsService, ticketRepository: Repository<Ticket>);
    getAllTickets(): Promise<Ticket[]>;
    createTicket(seat: Seat, event: Event, customer: Customer): Promise<Ticket>;
    getUserTicketsInfo(customer: Customer): Promise<Ticket[]>;
}
