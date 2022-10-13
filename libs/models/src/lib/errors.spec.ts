import { ErrorResponseDto } from './errors'
import { plainToInstance } from 'class-transformer'
import { validate } from 'class-validator'

describe('Models:error', () => {
  it('Code may be a number', async () => {
    const errorPayload = { code: 123, message: 'error' }
    const ofErrorPayload = plainToInstance(ErrorResponseDto, errorPayload)
    const errors = await validate(ofErrorPayload)
    expect(errors.length).toBe(0)
  })

  it('Code may be a string', async () => {
    const errorPayload = { code: '123', message: 'error' }
    const ofErrorPayload = plainToInstance(ErrorResponseDto, errorPayload)
    const errors = await validate(ofErrorPayload)
    expect(errors.length).toBe(0)
  })

  it('Code is required', async () => {
    const errorPayload = { message: 'error' }
    const ofErrorPayload = plainToInstance(ErrorResponseDto, errorPayload)
    const errors = await validate(ofErrorPayload)
    expect(errors.length).toBe(1)
    expect(errors[0].constraints?.isNotEmpty).toBe('code should not be empty')
  })

  it('Message is required', async () => {
    const errorPayload = { code: '123' }
    const ofErrorPayload = plainToInstance(ErrorResponseDto, errorPayload)
    const errors = await validate(ofErrorPayload)
    expect(errors.length).toBe(1)
    expect(errors[0].constraints?.isNotEmpty).toBe('message should not be empty')
  })
})
