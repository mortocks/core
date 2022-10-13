import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty } from 'class-validator'

export class AuthEmailPassDTO {
  @IsEmail()
  @ApiProperty({ type: String, description: 'The email address of the users account' })
  email: string

  @IsNotEmpty()
  @ApiProperty({ type: String, description: 'The password for the users account' })
  password: string
}
