import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { TicketsService } from 'src/events_booking/service/tickets/tickets.service';
import { CreateTicketDto } from 'src/events_booking/dto/CreateTicket.dto';
import { SeatsService } from 'src/events_booking/service/seats/seats.service';
import { EventsService } from 'src/events_booking/service/events/events.service';
import { CustomersService } from 'src/events_booking/service/customers/customers.service';
import { EmailService } from 'src/email/email.service';

@Controller('tickets')
export class TicketsController {
  constructor(
    private ticketService: TicketsService,
    private eventService: EventsService,
    private seatService: SeatsService,
    private customersService: CustomersService,
    private emailService: EmailService,
  ) {}

  @Get()
  getTickets() {
    return this.ticketService.getAllTickets();
  }

  @Get('user_tickets/:id')
  async findCustomerTickets(@Param('id') id: string) {
    const customer = await this.customersService.findCustomer(id);
    const tickets = await this.ticketService.getUserTicketsInfo(customer);

    return tickets;
  }

  @Post('create_ticket')
  async createTicket(@Body() createTicketDto: CreateTicketDto) {
    const { seats_id, event_id, ...customer_info } = createTicketDto;

    const tickets = [];

    const event = await this.eventService.findSpecificEvent(event_id);
    const customer = await this.customersService.creatCustomer(customer_info);

    for (let seat_id of seats_id) {
      const seat = await this.seatService.findTicketSeat(seat_id);

      const ticket = await this.ticketService.createTicket(
        seat,
        event,
        customer,
      );
      tickets.push(ticket);
    }

    //send confirmation ticket
    const userPrivateId = customer.id;
    await this.emailService.sendUserConfirmation(customer_info, userPrivateId);

    return tickets;
  }
}
