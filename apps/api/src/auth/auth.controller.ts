import { Controller, Get, Put, HttpCode } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { ApiOperation, ApiResponse, ApiOkResponse, ApiBadRequestResponse, ApiTags } from '@nestjs/swagger'
import { CreateUserDto, UpdateUserDto, ErrorResponseDto } from '@core/models'

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private configService: ConfigService) {}

  /**
   * GET /login
   * @returns
   */
  @Get('/login')
  @ApiOperation({ description: 'Authenticate a user' })
  @ApiOkResponse({
    status: 200,
    description: 'User successfully authenticated',
    type: CreateUserDto,
  })
  @ApiBadRequestResponse({
    status: 401,
    description: 'Email or password is incorrect',
    type: ErrorResponseDto,
  })
  @HttpCode(200)
  authenticate(): Promise<string> {
    const foo = this.configService.get<string>('port')
    return new Promise((res) => {
      res(foo || 'Boop')
    })
  }

  /**
   * PUT /login
   * @returns
   */
  @Put('/login')
  @ApiOperation({ description: 'Authenticate a user' })
  @ApiResponse({
    status: 200,
    description: 'User updated successfully',
    type: UpdateUserDto,
  })
  @HttpCode(200)
  update(): Promise<string> {
    const foo = this.configService.get<string>('port')
    return new Promise((res) => {
      res(foo || 'Boop')
    })
  }
}
