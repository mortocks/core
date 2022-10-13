import { AuthEmailPassDTO } from './auth'
import { plainToInstance } from 'class-transformer'
import { validate } from 'class-validator'

describe('Models:auth', () => {
  it('Email is required', async () => {
    const authPayload = { password: 'pass' }
    const ofAuthPayload = plainToInstance(AuthEmailPassDTO, authPayload)
    const errors = await validate(ofAuthPayload)
    expect(errors.length).not.toBe(0)
    expect(errors[0].constraints?.isEmail).toEqual('email must be an email')
  })

  it('Email must be a valid email', async () => {
    const authPayload = { email: 'Not an email', password: 'pass' }
    const ofAuthPayload = plainToInstance(AuthEmailPassDTO, authPayload)
    const errors = await validate(ofAuthPayload)
    expect(errors.length).not.toBe(0)
    expect(errors[0].constraints?.isEmail).toEqual('email must be an email')
  })

  it('Password is required', async () => {
    const authPayload = { email: 'name@email.com' }
    const ofAuthPayload = plainToInstance(AuthEmailPassDTO, authPayload)
    const errors = await validate(ofAuthPayload)
    expect(errors.length).not.toBe(0)
    expect(errors[0].constraints?.isNotEmpty).toEqual('password should not be empty')
  })

  it('Password cannot be an empty string', async () => {
    const authPayload = { email: 'name@email.com', password: '' }
    const ofAuthPayload = plainToInstance(AuthEmailPassDTO, authPayload)
    const errors = await validate(ofAuthPayload)
    expect(errors.length).not.toBe(0)
    expect(errors[0].constraints?.isNotEmpty).toEqual('password should not be empty')
  })
})
