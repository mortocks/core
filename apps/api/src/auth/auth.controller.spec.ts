import { Test, TestingModule } from '@nestjs/testing'
import { AuthController } from './auth.controller'
import { ConfigService } from '@nestjs/config'
describe('AuthController', () => {
  let controller: AuthController
  let configService: ConfigService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn((key: string) => {
              if (key === 'port') {
                return 123
              }
              return null
            }),
          },
        },
      ],
    }).compile()

    configService = module.get<ConfigService>(ConfigService)
    controller = module.get<AuthController>(AuthController)
  })

  it('controller should be defined', () => {
    expect(controller).toBeDefined()
  })

  it('configService should be defined', () => {
    expect(configService).toBeDefined()
    expect(configService.get('port')).toBe(123)
  })
})
