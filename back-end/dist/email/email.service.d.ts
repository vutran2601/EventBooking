import { MailerService } from '@nestjs-modules/mailer';
interface User {
    fullName: string;
    email: string;
}
export declare class EmailService {
    private mailerService;
    constructor(mailerService: MailerService);
    sendUserConfirmation(user: User, userId: string): Promise<void>;
}
export {};
