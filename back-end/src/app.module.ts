import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from './typeorm/entities/Event';
import { Customer } from './typeorm/entities/Customer';
import { Seat } from './typeorm/entities/Seat';
import { Ticket } from './typeorm/entities/Ticket';
import { Seatmap } from './typeorm/entities/Seatmap';
import { EventsBookingModule } from './events_booking/events_booking.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '103.200.23.139',
      port: 3306,
      username: 'aaronduc_admin',
      password: 'chungtakhongthuocvenhau',
      database: 'aaronduc_eventbooking',
      entities: [Event, Customer, Seat, Ticket, Seatmap],
      synchronize: true,
    }),
    EventsBookingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
