import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength } from 'class-validator';

export class SignInDto {
  @IsNotEmpty()
  @MaxLength(8)
  @ApiProperty({ example: 'ABC123' })
  employeeCode: string;

  @IsNotEmpty()
  @ApiProperty({ example: 'Tanhun123@' })
  password: string;
}
