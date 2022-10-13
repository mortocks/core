import { Controller, Get, HttpCode } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private configService: ConfigService) {}

  @Get('/login')
  @ApiOperation({ description: 'Authenticate a user' })
  // @ApiResponse({
  //   status: 200,
  //   description: 'User successfully authenticated',
  // })
  @HttpCode(200)
  authenticate(): Promise<string> {
    const foo = this.configService.get<string>('port')
    return new Promise((res) => {
      res(foo || 'Boop')
    })
  }
}
