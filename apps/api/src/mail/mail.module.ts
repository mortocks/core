import { MailerModule } from '@nestjs-modules/mailer'
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter'
import { Module, Global } from '@nestjs/common'
import { MailerService } from '@nestjs-modules/mailer'
import { ConfigService } from '@nestjs/config'
import { join } from 'path'
import { MailService } from './mail.service'

@Global()
@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: async (config: ConfigService) => {
        return {
          preview: config.get<boolean>('MAIL_PREVIEW', process.env.NODE_ENV === 'development'),
          transport: {
            host: config.get<string>('MAIL_HOST', 'localhost'),
            secure: config.get<boolean>('MAIL_SECURE', true),
            port: config.get<number>('MAIL_PORT'),
            auth: {
              user: config.get<string>('MAIL_AUTH_USER', ''),
              pass: config.get<string>('MAIL_AUTH_PASS', ''),
            },
          },
          defaults: {
            from: config.get<string>('MAIL_DEFAULTS_FROM', 'noreply@core.io'),
          },
          template: {
            dir: join(__dirname, 'templates'),
            adapter: new HandlebarsAdapter(),
            options: {
              strict: true,
            },
          },
        }
      },
      inject: [ConfigService],
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
