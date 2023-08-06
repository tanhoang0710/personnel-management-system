import { PipeTransform, Injectable } from '@nestjs/common';
import { FORM_CATEGORIES } from '../enums/formCategories.enum';

@Injectable()
export class ParseFormCategoryPipe implements PipeTransform {
  transform(value: string) {
    console.log(
      '🚀 ~ file: parseFormCategory.pipe.ts:7 ~ ParseFormCategoryPipe ~ transform ~ value:',
      Object.values(FORM_CATEGORIES).includes(value as FORM_CATEGORIES),
      value,
    );
    return Object.values(FORM_CATEGORIES).includes(value as FORM_CATEGORIES);
  }
}
