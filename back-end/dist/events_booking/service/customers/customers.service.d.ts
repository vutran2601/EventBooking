import { Repository } from 'typeorm';
import { Customer } from 'src/typeorm/entities/Customer';
interface CustomerInfo {
    fullName: string;
    email: string;
}
export declare class CustomersService {
    private customerRepository;
    constructor(customerRepository: Repository<Customer>);
    creatCustomer(customerInfo: CustomerInfo): Promise<Customer>;
    findCustomer(userid: string): Promise<Customer>;
}
export {};
