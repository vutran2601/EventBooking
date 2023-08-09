import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

interface User {
  fullName: string;
  email: string;
}

@Injectable()
export class EmailService {
  constructor(private mailerService: MailerService) {}

  async sendUserConfirmation(user: User, userId: string) {
    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Welcome to our Booking App! Booking confirmation code',
      template: './confirmation',
      context: {
        name: user.fullName,
        code: userId,
      },
    });
  }
}
