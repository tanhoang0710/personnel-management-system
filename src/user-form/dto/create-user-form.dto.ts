import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateUserFormDto {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ example: 1 })
  userId: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ example: 1 })
  formId: number;
}
