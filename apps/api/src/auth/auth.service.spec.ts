import { Test, TestingModule } from '@nestjs/testing'
import { AuthService } from './auth.service'
import { MailModule } from '../mail/mail.module'
import { MailService } from '../mail/mail.service'
import { ConfigModule } from '@nestjs/config'

describe('AuthService', () => {
  let service: AuthService
  let mailService: MailService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MailModule,
        ConfigModule.forRoot({
          isGlobal: true,
          envFilePath: ['.local.env', '.test.env'],
        }),
      ],
      providers: [AuthService],
    }).compile()

    mailService = module.get<MailService>(MailService)
    service = module.get<AuthService>(AuthService)
  })

  it('should be defined', async () => {
    expect(service).toBeDefined()
  })

  it('should send a welcome email', async () => {
    const result = new Promise((res) => res(''))
    const spy = jest.spyOn(mailService, 'sendWelcomeEmail').mockImplementation(() => result)

    await service.registerUser()

    expect(spy).toBeCalledTimes(1)
    expect(spy).toBeCalledWith('mortocks@gmail.com', 'Bob')
  })
})
