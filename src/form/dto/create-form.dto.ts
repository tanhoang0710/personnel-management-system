import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsNotEmpty, IsNumber } from 'class-validator';
import { STATUS } from 'src/common/enums/status.enum';

export class CreateFormDto {
  @IsNotEmpty()
  @IsDateString()
  @ApiProperty({ example: '2023-07-21' })
  dueDate: string;

  @IsNotEmpty()
  @ApiProperty({ example: '123456' })
  description: string;

  @IsNotEmpty()
  @ApiProperty({ example: 'Evaluation Form' })
  name: string;

  @IsNotEmpty()
  @IsEnum(STATUS)
  @ApiProperty({
    enum: STATUS,
    isArray: false,
    example: STATUS.NEW,
  })
  status: STATUS;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ example: 1 })
  formCategoryId: number;
}
