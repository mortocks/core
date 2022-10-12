import { Module } from '@nestjs/common'

import { AppController } from './app.controller'
import { AuthModule } from '../auth/auth.module'
import { AppService } from './app.service'
import { ConfigModule } from '@nestjs/config'
import configuration from '../config/configuration'

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
