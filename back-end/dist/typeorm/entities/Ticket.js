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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ticket = void 0;
const typeorm_1 = require("typeorm");
const Event_1 = require("./Event");
const Seat_1 = require("./Seat");
const Customer_1 = require("./Customer");
let Ticket = exports.Ticket = class Ticket {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Ticket.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Ticket.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Event_1.Event, (event) => event.tickets),
    __metadata("design:type", Event_1.Event)
], Ticket.prototype, "event", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => Seat_1.Seat),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Seat_1.Seat)
], Ticket.prototype, "seat", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Customer_1.Customer, (customer) => customer.tickets),
    __metadata("design:type", Customer_1.Customer)
], Ticket.prototype, "customer", void 0);
exports.Ticket = Ticket = __decorate([
    (0, typeorm_1.Entity)({ name: 'ticket', schema: 'eventbooking' })
], Ticket);
//# sourceMappingURL=Ticket.js.map