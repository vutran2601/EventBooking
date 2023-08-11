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
exports.Seat = void 0;
const typeorm_1 = require("typeorm");
const Seatmap_1 = require("./Seatmap");
let Seat = exports.Seat = class Seat {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Seat.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Seat.prototype, "seatPos", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Seat.prototype, "seatType", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'available' }),
    __metadata("design:type", String)
], Seat.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Seatmap_1.Seatmap, (seatmap) => seatmap.seat),
    __metadata("design:type", Seatmap_1.Seatmap)
], Seat.prototype, "seatmap", void 0);
exports.Seat = Seat = __decorate([
    (0, typeorm_1.Entity)({ name: 'seat', schema: 'eventbooking' })
], Seat);
//# sourceMappingURL=Seat.js.map