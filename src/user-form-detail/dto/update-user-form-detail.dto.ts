import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, Max, Min } from 'class-validator';

export class UpdateUserFormDetailDto {
  @IsOptional()
  @ApiProperty({ example: 'task 1' })
  descTask?: string;

  @IsOptional()
  @ApiProperty({ example: 'ok' })
  result?: string;

  @IsOptional()
  @IsNumber()
  @Max(10)
  @Min(0)
  @ApiProperty({ example: 10 })
  point?: number;
}
