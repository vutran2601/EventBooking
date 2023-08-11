import { TicketsService } from 'src/events_booking/service/tickets/tickets.service';
import { CreateTicketDto } from 'src/events_booking/dto/CreateTicket.dto';
import { SeatsService } from 'src/events_booking/service/seats/seats.service';
import { EventsService } from 'src/events_booking/service/events/events.service';
import { CustomersService } from 'src/events_booking/service/customers/customers.service';
import { EmailService } from 'src/email/email.service';
export declare class TicketsController {
    private ticketService;
    private eventService;
    private seatService;
    private customersService;
    private emailService;
    constructor(ticketService: TicketsService, eventService: EventsService, seatService: SeatsService, customersService: CustomersService, emailService: EmailService);
    getTickets(): Promise<import("../../../typeorm/entities/Ticket").Ticket[]>;
    findCustomerTickets(id: string): Promise<import("../../../typeorm/entities/Ticket").Ticket[]>;
    createTicket(createTicketDto: CreateTicketDto): Promise<any[]>;
}
