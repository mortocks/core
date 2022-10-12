import { MailerService, ISendMailOptions } from '@nestjs-modules/mailer'
import { Injectable } from '@nestjs/common'

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendEmail(options: ISendMailOptions): Promise<any> {
    return this.mailerService.sendMail(options)
  }

  async sendWelcomeEmail(to: string, name: string): Promise<any> {
    return this.mailerService.sendMail({
      to,
      subject: 'Welcome to Nice App! Confirm your Email',
      template: './welcome',
      context: {
        name,
      },
    })
  }
}
