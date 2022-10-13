import { CreateUserDto } from './users'
import { plainToInstance } from 'class-transformer'
import { validate } from 'class-validator'

describe('Models:users', () => {
  it('Should create a successful user', async () => {
    const userInfo = { email: 'name@email.com', password: 'pass' }
    const ofUserDto = plainToInstance(CreateUserDto, userInfo)
    const errors = await validate(ofUserDto)
    expect(errors.length).toBe(0)
  })

  it('Email is required', async () => {
    const userInfo = { password: 'pass' }
    const ofUserDto = plainToInstance(CreateUserDto, userInfo)
    const errors = await validate(ofUserDto)
    expect(errors.length).not.toBe(0)
    expect(errors[0].constraints?.isEmail).toEqual('email must be an email')
  })

  it('Email must be a valid email', async () => {
    const userInfo = { email: 'Not an email', password: 'pass' }
    const ofUserDto = plainToInstance(CreateUserDto, userInfo)
    const errors = await validate(ofUserDto)
    expect(errors.length).not.toBe(0)
    expect(errors[0].constraints?.isEmail).toEqual('email must be an email')
  })

  it('Password is required', async () => {
    const userInfo = { email: 'name@email.com' }
    const ofUserDto = plainToInstance(CreateUserDto, userInfo)
    const errors = await validate(ofUserDto)
    expect(errors.length).not.toBe(0)
    expect(errors[0].constraints?.isNotEmpty).toEqual('password should not be empty')
  })

  it('Password cannot be an empty string', async () => {
    const userInfo = { email: 'name@email.com', password: '' }
    const ofUserDto = plainToInstance(CreateUserDto, userInfo)
    const errors = await validate(ofUserDto)
    expect(errors.length).not.toBe(0)
    expect(errors[0].constraints?.isNotEmpty).toEqual('password should not be empty')
  })
})
