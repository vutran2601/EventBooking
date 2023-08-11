import { Event } from 'src/typeorm/entities/Event';
import { Seatmap } from 'src/typeorm/entities/Seatmap';
import { Repository } from 'typeorm';
import { CreateEventDto } from '../../dto/CreateEvent.dto';
export declare class EventsService {
    private eventRepository;
    constructor(eventRepository: Repository<Event>);
    getAllEvents(): Promise<Event[]>;
    getPublishEvents(): Promise<Event[]>;
    findSpecificEvent(event_id: string): Promise<Event>;
    findFilterEvents(searchKeyWord: string): Promise<Event[]>;
    publishEvent(event_id: string): Promise<void>;
    createEvent(createEventParams: CreateEventDto, seatmap: Seatmap): void;
}
