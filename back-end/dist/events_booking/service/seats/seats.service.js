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
exports.SeatsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const Seat_1 = require("../../../typeorm/entities/Seat");
const Seatmap_1 = require("../../../typeorm/entities/Seatmap");
let SeatsService = exports.SeatsService = class SeatsService {
    constructor(seatRepository, seatmapRepository) {
        this.seatRepository = seatRepository;
        this.seatmapRepository = seatmapRepository;
    }
    async findTicketSeat(seat_id) {
        const seat = await this.seatRepository.findOne({ where: { id: seat_id } });
        seat.status = 'unavailable';
        return this.seatRepository.save(seat);
    }
    async findSeatmap(seatmap_id) {
        const seatmap = await this.seatmapRepository.findOne({
            where: { id: seatmap_id },
        });
        return await this.seatRepository.find({
            where: {
                seatmap: seatmap,
            },
        });
    }
    async createSeat(seatmap) {
        for (let seatPos = 1; seatPos <= 100; seatPos++) {
            const seat = this.seatRepository.create({
                seatPos: seatPos,
                seatType: seatPos <= 20 ? 'vip' : seatPos <= 80 ? 'normal' : 'sweetbox',
                seatmap: seatmap,
            });
            await this.seatRepository.save(seat);
        }
    }
    async createSeatmap() {
        const newSeatmap = this.seatmapRepository.create();
        await this.seatmapRepository.save(newSeatmap);
        await this.createSeat(newSeatmap);
        const seats = await this.seatRepository.find({
            where: {
                seatmap: newSeatmap,
            },
        });
        newSeatmap.seat = seats;
        await this.seatmapRepository.save(newSeatmap);
        return newSeatmap;
    }
};
exports.SeatsService = SeatsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(Seat_1.Seat)),
    __param(1, (0, typeorm_1.InjectRepository)(Seatmap_1.Seatmap)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], SeatsService);
//# sourceMappingURL=seats.service.js.map