import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { FORM_CATEGORIES } from 'src/common/enums/formCategories.enum';

export class CreateFormCategoryDto {
  @IsNotEmpty()
  @IsEnum(FORM_CATEGORIES)
  @ApiProperty({
    enum: FORM_CATEGORIES,
    isArray: false,
    example: FORM_CATEGORIES.EVALUATION_FORM,
  })
  name: FORM_CATEGORIES;
}
