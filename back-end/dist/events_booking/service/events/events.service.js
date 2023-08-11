"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const Event_1 = require("../../../typeorm/entities/Event");
const typeorm_2 = require("typeorm");
let EventsService = exports.EventsService = class EventsService {
    constructor(eventRepository) {
        this.eventRepository = eventRepository;
    }
    async getAllEvents() {
        return await this.eventRepository.find({ relations: ['seatmap'] });
    }
    async getPublishEvents() {
        return await this.eventRepository.find({ where: { status: 'published' } });
    }
    async findSpecificEvent(event_id) {
        return this.eventRepository.findOne({ where: { id: event_id } });
    }
    async findFilterEvents(searchKeyWord) {
        const eventsList = await this.getAllEvents();
        const filterList = eventsList.filter((event) => {
            return event.title.toLowerCase().includes(searchKeyWord.toLowerCase());
        });
        return filterList;
    }
    async publishEvent(event_id) {
        const event = await this.findSpecificEvent(event_id);
        event.status = 'published';
        this.eventRepository.save(event);
    }
    createEvent(createEventParams, seatmap) {
        const newEvents = this.eventRepository.create({
            ...createEventParams,
            createTime: new Date(),
            seatmap: seatmap,
        });
        this.eventRepository.save(newEvents);
    }
};
exports.EventsService = EventsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(Event_1.Event)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], EventsService);
//# sourceMappingURL=events.service.js.map