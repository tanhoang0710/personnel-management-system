import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import {
  IsEmail,
  IsMobilePhone,
  IsNumber,
  IsOptional,
  MaxLength,
} from 'class-validator';
import { SignUpDto } from 'src/auth/dto/sign-up.dto';

export class UpdateProfileDto extends OmitType(PartialType(SignUpDto), [
  'password',
  'employeeCode',
]) {
  @IsOptional()
  @MaxLength(10)
  @ApiProperty({ example: 'tan' })
  firstName?: string;

  @IsOptional()
  @MaxLength(30)
  @ApiProperty({ example: 'hun' })
  lastName?: string;

  @IsOptional()
  @IsEmail()
  @MaxLength(50)
  @ApiProperty({ example: 'tanhoang0710@gmail.com' })
  email?: string;

  @IsOptional()
  @IsMobilePhone('vi-VN')
  @ApiProperty({ example: '0987256698' })
  phone?: string;

  @IsOptional()
  @MaxLength(15)
  @ApiProperty({ example: 'HS40101208771' })
  healhInsuranceCode?: string;

  @IsOptional()
  @MaxLength(255)
  @ApiProperty({ example: 'HN' })
  address?: string;

  @IsOptional()
  @IsNumber()
  @ApiProperty({ example: 1 })
  dependantId?: number;
}
