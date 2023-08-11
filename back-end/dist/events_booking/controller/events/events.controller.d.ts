/// <reference types="multer" />
import { CreateEventDto } from 'src/events_booking/dto/CreateEvent.dto';
import { EventsService } from 'src/events_booking/service/events/events.service';
import { SeatsService } from 'src/events_booking/service/seats/seats.service';
import { CloudinaryService } from 'src/cloudinary/Cloudinary.service';
export declare class EventsController {
    private eventService;
    private seatService;
    private readonly cloudinaryService;
    constructor(eventService: EventsService, seatService: SeatsService, cloudinaryService: CloudinaryService);
    getEvents(): Promise<import("../../../typeorm/entities/Event").Event[]>;
    getPublishEvents(): Promise<import("../../../typeorm/entities/Event").Event[]>;
    getEventSeatmap(id: string): Promise<import("../../../typeorm/entities/Seat").Seat[]>;
    getFilterEvents(query: string): Promise<import("../../../typeorm/entities/Event").Event[]>;
    updateEventStatus(id: string): void;
    createEvent(file: Express.Multer.File, createEventDto: CreateEventDto): Promise<void>;
}
