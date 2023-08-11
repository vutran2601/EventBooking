import { Event } from './Event';
import { Seat } from './Seat';
import { Customer } from './Customer';
export declare class Ticket {
    id: string;
    status: boolean;
    event: Event;
    seat: Seat;
    customer: Customer;
}
