import * as request from 'supertest'
import { Test, TestingModule } from '@nestjs/testing'
import { HealthController } from './health.controller'
import { HealthModule } from './health.module'
import { INestApplication } from '@nestjs/common'
import { HealthCheckService } from '@nestjs/terminus'
describe('HealthController', () => {
  let app: INestApplication
  let controller: HealthController
  const healthService = {
    check: () => ({
      status: 'ok',
      info: { 'nestjs-docs': { status: 'up' }, memory_heap: { status: 'up' } },
      error: {},
      details: { 'nestjs-docs': { status: 'up' }, memory_heap: { status: 'up' } },
    }),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HealthModule],
    })
      .overrideProvider(HealthCheckService)
      .useValue(healthService)
      .compile()

    controller = module.get<HealthController>(HealthController)
    app = module.createNestApplication()
    await app.init()
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  it(`/GET /health`, () => {
    return request(app.getHttpServer()).get('/health').expect(200).expect(healthService.check())
  })
})
