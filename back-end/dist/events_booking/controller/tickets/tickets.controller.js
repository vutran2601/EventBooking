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
exports.TicketsController = void 0;
const common_1 = require("@nestjs/common");
const tickets_service_1 = require("../../service/tickets/tickets.service");
const CreateTicket_dto_1 = require("../../dto/CreateTicket.dto");
const seats_service_1 = require("../../service/seats/seats.service");
const events_service_1 = require("../../service/events/events.service");
const customers_service_1 = require("../../service/customers/customers.service");
const email_service_1 = require("../../../email/email.service");
let TicketsController = exports.TicketsController = class TicketsController {
    constructor(ticketService, eventService, seatService, customersService, emailService) {
        this.ticketService = ticketService;
        this.eventService = eventService;
        this.seatService = seatService;
        this.customersService = customersService;
        this.emailService = emailService;
    }
    getTickets() {
        return this.ticketService.getAllTickets();
    }
    async findCustomerTickets(id) {
        const customer = await this.customersService.findCustomer(id);
        const tickets = await this.ticketService.getUserTicketsInfo(customer);
        return tickets;
    }
    async createTicket(createTicketDto) {
        const { seats_id, event_id, ...customer_info } = createTicketDto;
        const tickets = [];
        const event = await this.eventService.findSpecificEvent(event_id);
        const customer = await this.customersService.creatCustomer(customer_info);
        for (let seat_id of seats_id) {
            const seat = await this.seatService.findTicketSeat(seat_id);
            const ticket = await this.ticketService.createTicket(seat, event, customer);
            tickets.push(ticket);
        }
        const userPrivateId = customer.id;
        await this.emailService.sendUserConfirmation(customer_info, userPrivateId);
        return tickets;
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TicketsController.prototype, "getTickets", null);
__decorate([
    (0, common_1.Get)('user_tickets/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TicketsController.prototype, "findCustomerTickets", null);
__decorate([
    (0, common_1.Post)('create_ticket'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateTicket_dto_1.CreateTicketDto]),
    __metadata("design:returntype", Promise)
], TicketsController.prototype, "createTicket", null);
exports.TicketsController = TicketsController = __decorate([
    (0, common_1.Controller)('tickets'),
    __metadata("design:paramtypes", [tickets_service_1.TicketsService,
        events_service_1.EventsService,
        seats_service_1.SeatsService,
        customers_service_1.CustomersService,
        email_service_1.EmailService])
], TicketsController);
//# sourceMappingURL=tickets.controller.js.map