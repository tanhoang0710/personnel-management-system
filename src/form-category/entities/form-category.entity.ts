import { BaseEntity } from 'src/common/entities/base.entity';
import { FORM_CATEGORIES } from 'src/common/enums/formCategories.enum';
import { Form } from 'src/form/entities/form.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity('formCategories')
export class FormCategory extends BaseEntity {
  @Column({
    type: 'enum',
    enum: FORM_CATEGORIES,
    default: FORM_CATEGORIES.PROBATIONARY_FORM,
  })
  name: FORM_CATEGORIES;

  @OneToMany(() => Form, (form) => form.formCategory, { cascade: true })
  formCategories: Form[];
}
