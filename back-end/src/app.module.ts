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
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: 'config.env',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DBNAME,
      entities: [Event, Customer, Seat, Ticket, Seatmap],
      synchronize: true,
    }),
    EventsBookingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
