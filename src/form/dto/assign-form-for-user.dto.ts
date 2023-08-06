import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class AssignFormForUserDto {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ example: 1 })
  userId: number;
}
