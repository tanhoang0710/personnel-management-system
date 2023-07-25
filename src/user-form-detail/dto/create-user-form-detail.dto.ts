import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, Max, Min } from 'class-validator';

export class CreateUserFormDetailDto {
  @IsNotEmpty()
  @ApiProperty({ example: 'task 1' })
  descTask: string;

  @IsNotEmpty()
  @ApiProperty({ example: 'ok' })
  result: string;

  @IsNotEmpty()
  @IsNumber()
  @Max(10)
  @Min(0)
  @ApiProperty({ example: 10 })
  point: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ example: 1 })
  userFormId: number;
}
