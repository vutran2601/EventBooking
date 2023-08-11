import { Repository } from 'typeorm';
import { Seat } from 'src/typeorm/entities/Seat';
import { Seatmap } from 'src/typeorm/entities/Seatmap';
export declare class SeatsService {
    private seatRepository;
    private seatmapRepository;
    constructor(seatRepository: Repository<Seat>, seatmapRepository: Repository<Seatmap>);
    findTicketSeat(seat_id: string): Promise<Seat>;
    findSeatmap(seatmap_id: string): Promise<Seat[]>;
    createSeat(seatmap: Seatmap): Promise<void>;
    createSeatmap(): Promise<Seatmap>;
}
