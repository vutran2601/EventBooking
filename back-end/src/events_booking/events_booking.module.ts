import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { EventsController } from './controller/events/events.controller';
import { EventsService } from './service/events/events.service';
import { SeatsService } from './service/seats/seats.service';
import { CloudinaryModule } from '../cloudinary/Cloudinary.module';
import { EmailModule } from '../email/email.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from '../typeorm/entities/Event';
import { Seat } from '../typeorm/entities/Seat';
import { Seatmap } from '../typeorm/entities/Seatmap';
import { Ticket } from '../typeorm/entities/Ticket';
import { Customer } from '../typeorm/entities/Customer';
import { TicketsController } from './controller/tickets/tickets.controller';
import { TicketsService } from './service/tickets/tickets.service';
import { CustomersService } from './service/customers/customers.service';
import { EmailValidationMiddleware } from '../middleware/emailValidation.middleware';

@Module({
  imports: [
    TypeOrmModule.forFeature([Event, Seat, Seatmap, Ticket, Customer]),
    EmailModule,
    CloudinaryModule,
  ],
  controllers: [EventsController, TicketsController],
  providers: [EventsService, SeatsService, TicketsService, CustomersService],
})
export class EventsBookingModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(EmailValidationMiddleware)
      .forRoutes({ path: 'tickets/create_ticket', method: RequestMethod.POST });
  }
}
