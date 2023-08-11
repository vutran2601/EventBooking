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
exports.Seatmap = void 0;
const typeorm_1 = require("typeorm");
const Seat_1 = require("./Seat");
let Seatmap = exports.Seatmap = class Seatmap {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Seatmap.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], Seatmap.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Seat_1.Seat, (seat) => seat.seatmap),
    __metadata("design:type", Array)
], Seatmap.prototype, "seat", void 0);
exports.Seatmap = Seatmap = __decorate([
    (0, typeorm_1.Entity)({ name: 'seatmap', schema: 'eventbooking' })
], Seatmap);
//# sourceMappingURL=Seatmap.js.map