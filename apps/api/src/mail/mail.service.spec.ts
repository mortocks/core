import { Test, TestingModule } from '@nestjs/testing'
import { MailService } from './mail.service'
import { MailModule } from './mail.module'
import { ConfigModule } from '@nestjs/config'

describe('MailService', () => {
  let service: MailService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MailModule,
        ConfigModule.forRoot({
          isGlobal: true,
        }),
      ],
      providers: [MailService],
    }).compile()

    service = module.get<MailService>(MailService)
  })

  it('should be defined', async () => {
    expect(service).toBeDefined()
  })
})
