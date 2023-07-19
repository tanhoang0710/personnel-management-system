import { BaseEntity } from 'src/common/entities/base.entity';
import { STATUS } from 'src/common/enums/status.enum';
import { FormCategory } from 'src/form-category/entities/form-category.entity';
import { UserForm } from 'src/user-form/entities/user-form.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

@Entity('forms')
export class Form extends BaseEntity {
  @Column()
  dueDate: Date;

  @Column({ type: 'text' })
  description: string;

  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: STATUS,
    default: STATUS.NEW,
  })
  status: STATUS;

  @ManyToOne(() => FormCategory, (formCategory) => formCategory.formCategories)
  formCategory: FormCategory;

  @OneToMany(() => UserForm, (userForm) => userForm.form, {
    cascade: true,
  })
  userForms: UserForm[];
}
