import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AppController } from './app.controller'
import { AuthModule } from '../auth/auth.module'
import { AppService } from './app.service'
import { MailModule } from '../mail/mail.module'
import configuration from '../config/configuration'

@Module({
  imports: [
    AuthModule,
    MailModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
