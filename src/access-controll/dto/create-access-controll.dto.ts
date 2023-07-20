import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateAccessControllDto {
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsNotEmpty()
  @IsNumber()
  roleId: number;

  @IsNotEmpty()
  @IsNumber()
  permissionId: number;
}
