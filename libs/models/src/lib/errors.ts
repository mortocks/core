import { ApiProperty } from '@nestjs/swagger'

export class ErrorResponseDto {
  @ApiProperty({ type: String })
  code!: string

  @ApiProperty({ type: String })
  message!: string
}
