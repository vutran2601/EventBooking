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
exports.EventsController = void 0;
const common_1 = require("@nestjs/common");
const CreateEvent_dto_1 = require("../../dto/CreateEvent.dto");
const events_service_1 = require("../../service/events/events.service");
const seats_service_1 = require("../../service/seats/seats.service");
const decorators_1 = require("@nestjs/common/decorators");
const platform_express_1 = require("@nestjs/platform-express");
const Cloudinary_service_1 = require("../../../cloudinary/Cloudinary.service");
let EventsController = exports.EventsController = class EventsController {
    constructor(eventService, seatService, cloudinaryService) {
        this.eventService = eventService;
        this.seatService = seatService;
        this.cloudinaryService = cloudinaryService;
    }
    getEvents() {
        return this.eventService.getAllEvents();
    }
    getPublishEvents() {
        return this.eventService.getPublishEvents();
    }
    async getEventSeatmap(id) {
        return await this.seatService.findSeatmap(id);
    }
    getFilterEvents(query) {
        return this.eventService.findFilterEvents(query);
    }
    updateEventStatus(id) {
        this.eventService.publishEvent(id);
    }
    async createEvent(file, createEventDto) {
        const result = await this.cloudinaryService.uploadFile(file);
        createEventDto.posterImg = result.url;
        const seatmap = await this.seatService.createSeatmap();
        this.eventService.createEvent(createEventDto, seatmap);
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], EventsController.prototype, "getEvents", null);
__decorate([
    (0, common_1.Get)('published'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], EventsController.prototype, "getPublishEvents", null);
__decorate([
    (0, common_1.Get)('seatmap/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EventsController.prototype, "getEventSeatmap", null);
__decorate([
    (0, common_1.Get)('search'),
    __param(0, (0, common_1.Query)('query')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], EventsController.prototype, "getFilterEvents", null);
__decorate([
    (0, common_1.Put)('update_status/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], EventsController.prototype, "updateEventStatus", null);
__decorate([
    (0, common_1.Post)('create_event'),
    (0, decorators_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('posterImg')),
    __param(0, (0, decorators_1.UploadedFile)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, CreateEvent_dto_1.CreateEventDto]),
    __metadata("design:returntype", Promise)
], EventsController.prototype, "createEvent", null);
exports.EventsController = EventsController = __decorate([
    (0, common_1.Controller)('events'),
    __metadata("design:paramtypes", [events_service_1.EventsService,
        seats_service_1.SeatsService,
        Cloudinary_service_1.CloudinaryService])
], EventsController);
//# sourceMappingURL=events.controller.js.map