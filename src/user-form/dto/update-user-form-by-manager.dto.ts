import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { STATUS } from 'src/common/enums/status.enum';

export class UpdateUserFormByManagerDto {
  @IsNotEmpty()
  @ApiProperty({ example: 'ok' })
  managerComment: string;

  @IsNotEmpty()
  @IsEnum(STATUS)
  @ApiProperty({
    enum: STATUS,
    isArray: false,
    example: STATUS.APPROVED,
  })
  status: STATUS;
}
