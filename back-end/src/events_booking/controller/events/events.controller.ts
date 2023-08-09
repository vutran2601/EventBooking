import { Controller, Get, Post, Put, Body, Query, Param } from '@nestjs/common';
import { CreateEventDto } from 'src/events_booking/dto/CreateEvent.dto';
import { EventsService } from 'src/events_booking/service/events/events.service';
import { SeatsService } from 'src/events_booking/service/seats/seats.service';
import { UploadedFile, UseInterceptors } from '@nestjs/common/decorators';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from 'src/cloudinary/Cloudinary.service';

@Controller('events')
export class EventsController {
  constructor(
    private eventService: EventsService,
    private seatService: SeatsService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  @Get()
  getEvents() {
    return this.eventService.getAllEvents();
  }

  @Get('published')
  getPublishEvents() {
    return this.eventService.getPublishEvents();
  }

  @Get('seatmap/:id')
  async getEventSeatmap(@Param('id') id: string) {
    return await this.seatService.findSeatmap(id);
  }

  @Get('search')
  getFilterEvents(@Query('query') query: string) {
    return this.eventService.findFilterEvents(query);
  }

  @Put('update_status/:id')
  updateEventStatus(@Param('id') id: string) {
    this.eventService.publishEvent(id);
  }

  @Post('create_event')
  @UseInterceptors(FileInterceptor('posterImg'))
  async createEvent(
    @UploadedFile() file: Express.Multer.File,
    @Body() createEventDto: CreateEventDto,
  ) {
    const result = await this.cloudinaryService.uploadFile(file);

    createEventDto.posterImg = result.url;

    const seatmap = await this.seatService.createSeatmap();
    this.eventService.createEvent(createEventDto, seatmap);
  }
}
