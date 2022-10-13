import { ApiProperty, OmitType } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty } from 'class-validator'

export class CreateUserDto {
  @IsEmail()
  @ApiProperty({ type: String, description: 'The email address of the users account' })
  email: string

  @IsNotEmpty()
  @ApiProperty({ type: String, description: 'The password for the users account' })
  password: string

  // @ApiProperty({ enum: RoleEnum, default: [], isArray: true })
  // roles: RoleEnum[] = []

  @ApiProperty({ required: false, default: true, description: 'Is the account enabled' })
  isEnabled?: boolean = true
}

export class UpdateUserDto extends OmitType(CreateUserDto, ['isEnabled'] as const) {}
