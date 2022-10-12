import { Injectable } from '@nestjs/common'
import { MailService } from '../mail/mail.service'
@Injectable()
export class AuthService {
  constructor(private readonly mailService: MailService) {}

  async registerUser() {
    return this.mailService.sendWelcomeEmail('mortocks@gmail.com', 'Bob')
    // return this.mailService.sendEmail({
    //   to: 'mortocks@me.com',
    //   subject: 'Boop',
    //   template: './welcome',
    //   context: {
    //     name: 'Boop',
    //   },
    // })
  }
}
