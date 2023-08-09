import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Event } from 'src/typeorm/entities/Event';
import { Seatmap } from 'src/typeorm/entities/Seatmap';
import { Repository } from 'typeorm';
import { CreateEventDto } from '../../dto/CreateEvent.dto';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event) private eventRepository: Repository<Event>,
  ) {}

  async getAllEvents() {
    return await this.eventRepository.find({ relations: ['seatmap'] });
  }

  async getPublishEvents() {
    return await this.eventRepository.find({ where: { status: 'published' } });
  }

  async findSpecificEvent(event_id: string) {
    return this.eventRepository.findOne({ where: { id: event_id } });
  }

  async findFilterEvents(searchKeyWord: string) {
    const eventsList = await this.getAllEvents();

    const filterList = eventsList.filter((event) => {
      return event.title.toLowerCase().includes(searchKeyWord.toLowerCase());
    });

    return filterList;
  }

  async publishEvent(event_id: string) {
    const event = await this.findSpecificEvent(event_id);

    event.status = 'published';

    this.eventRepository.save(event);
  }

  createEvent(createEventParams: CreateEventDto, seatmap: Seatmap) {
    const newEvents = this.eventRepository.create({
      ...createEventParams,
      createTime: new Date(),
      seatmap: seatmap,
    });
    this.eventRepository.save(newEvents);
  }
}
