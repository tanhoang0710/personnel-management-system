import { BaseEntity } from 'src/common/entities/base.entity';
import { UserForm } from 'src/user-form/entities/user-form.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity('userFormDetails')
export class UserFormDetail extends BaseEntity {
  @Column()
  descTask: string;

  @Column()
  result: string;

  @Column()
  point: number;

  @ManyToOne(() => UserForm, (userForm) => userForm.userFormDetails)
  userForm: UserForm;
}
