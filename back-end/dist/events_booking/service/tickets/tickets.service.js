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
exports.TicketsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const Ticket_1 = require("../../../typeorm/entities/Ticket");
const events_service_1 = require("../events/events.service");
const seats_service_1 = require("../seats/seats.service");
let TicketsService = exports.TicketsService = class TicketsService {
    constructor(eventsService, seatsService, ticketRepository) {
        this.eventsService = eventsService;
        this.seatsService = seatsService;
        this.ticketRepository = ticketRepository;
    }
    getAllTickets() {
        return this.ticketRepository.find();
    }
    createTicket(seat, event, customer) {
        const newTicket = this.ticketRepository.create({
            seat: seat,
            event: event,
            customer: customer,
        });
        return this.ticketRepository.save(newTicket);
    }
    async getUserTicketsInfo(customer) {
        return await this.ticketRepository.find({
            where: {
                customer: customer,
            },
            relations: ['customer', 'seat', 'event'],
        });
    }
};
exports.TicketsService = TicketsService = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, typeorm_1.InjectRepository)(Ticket_1.Ticket)),
    __metadata("design:paramtypes", [events_service_1.EventsService,
        seats_service_1.SeatsService,
        typeorm_2.Repository])
], TicketsService);
//# sourceMappingURL=tickets.service.js.map