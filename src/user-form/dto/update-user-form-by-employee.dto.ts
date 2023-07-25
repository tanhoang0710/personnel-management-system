import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { STATUS } from 'src/common/enums/status.enum';

export class UpdateUserFormByEmployeeDto {
  @IsNotEmpty()
  @ApiProperty({ example: 'ok' })
  userComment: string;

  @IsNotEmpty()
  @IsEnum(STATUS)
  @ApiProperty({
    enum: STATUS,
    isArray: false,
    example: STATUS.PENDING_APPROVAL,
  })
  status: STATUS;
}
