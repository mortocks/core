import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'

export class ErrorResponseDto {
  @IsNotEmpty()
  @ApiProperty({ type: String })
  code: string

  @IsNotEmpty()
  @ApiProperty({ type: String })
  message: string
}
