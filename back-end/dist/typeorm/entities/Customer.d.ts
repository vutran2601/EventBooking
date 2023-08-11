import { Ticket } from './Ticket';
export declare class Customer {
    id: string;
    fullName: string;
    email: string;
    status: boolean;
    tickets: Ticket[];
}
