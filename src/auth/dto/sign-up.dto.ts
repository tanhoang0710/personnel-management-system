import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsMobilePhone,
  IsNotEmpty,
  IsNumber,
  MaxLength,
} from 'class-validator';

export class SignUpDto {
  @IsNotEmpty()
  @MaxLength(8)
  @ApiProperty({ example: 'ABC123' })
  employeeCode: string;

  @IsNotEmpty()
  @MaxLength(10)
  @ApiProperty({ example: 'tan' })
  firstName: string;

  @IsNotEmpty()
  @MaxLength(30)
  @ApiProperty({ example: 'hun' })
  lastName: string;

  @IsNotEmpty()
  @IsEmail()
  @MaxLength(50)
  @ApiProperty({ example: 'tanhoang0710@gmail.com' })
  email: string;

  @IsNotEmpty()
  @IsMobilePhone('vi-VN')
  @ApiProperty({ example: '0987256698' })
  phone: string;

  @IsNotEmpty()
  @MaxLength(15)
  @ApiProperty({ example: 'HS40101208771' })
  healhInsuranceCode: string;

  @IsNotEmpty()
  @MaxLength(255)
  @ApiProperty({ example: 'HN' })
  address: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ example: 1 })
  dependantId: number;

  @IsNotEmpty()
  @ApiProperty({ example: '123456' })
  password: string;
}
