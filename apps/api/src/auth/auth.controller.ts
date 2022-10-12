import { Controller, Get, HttpCode } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

@Controller('auth')
export class AuthController {
  constructor(private configService: ConfigService) {}

  @Get('/login')
  @HttpCode(200)
  authenticate(): Promise<string> {
    const foo = this.configService.get<string>('port')
    return new Promise((res) => {
      res(foo || 'Boop')
    })
  }
}
