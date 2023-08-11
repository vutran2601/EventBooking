"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventsBookingModule = void 0;
const common_1 = require("@nestjs/common");
const events_controller_1 = require("./controller/events/events.controller");
const events_service_1 = require("./service/events/events.service");
const seats_service_1 = require("./service/seats/seats.service");
const Cloudinary_module_1 = require("../cloudinary/Cloudinary.module");
const email_module_1 = require("../email/email.module");
const typeorm_1 = require("@nestjs/typeorm");
const Event_1 = require("../typeorm/entities/Event");
const Seat_1 = require("../typeorm/entities/Seat");
const Seatmap_1 = require("../typeorm/entities/Seatmap");
const Ticket_1 = require("../typeorm/entities/Ticket");
const Customer_1 = require("../typeorm/entities/Customer");
const tickets_controller_1 = require("./controller/tickets/tickets.controller");
const tickets_service_1 = require("./service/tickets/tickets.service");
const customers_service_1 = require("./service/customers/customers.service");
const emailValidation_middleware_1 = require("../middleware/emailValidation.middleware");
let EventsBookingModule = exports.EventsBookingModule = class EventsBookingModule {
    configure(consumer) {
        consumer
            .apply(emailValidation_middleware_1.EmailValidationMiddleware)
            .forRoutes({ path: 'tickets/create_ticket', method: common_1.RequestMethod.POST });
    }
};
exports.EventsBookingModule = EventsBookingModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([Event_1.Event, Seat_1.Seat, Seatmap_1.Seatmap, Ticket_1.Ticket, Customer_1.Customer]),
            email_module_1.EmailModule,
            Cloudinary_module_1.CloudinaryModule,
        ],
        controllers: [events_controller_1.EventsController, tickets_controller_1.TicketsController],
        providers: [events_service_1.EventsService, seats_service_1.SeatsService, tickets_service_1.TicketsService, customers_service_1.CustomersService],
    })
], EventsBookingModule);
//# sourceMappingURL=events_booking.module.js.map