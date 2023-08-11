import { Ticket } from './Ticket';
import { Seatmap } from './Seatmap';
export declare class Event {
    id: string;
    title: string;
    price: number;
    eventType: string;
    eventDate: string;
    location: string;
    posterImg: string;
    createTime: Date;
    status: string;
    seatmap: Seatmap;
    tickets: Ticket[];
}
