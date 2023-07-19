import { BaseEntity } from 'src/common/entities/base.entity';
import { UserForm } from 'src/user-form/entities/user-form.entity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

@Entity('userFormDetails')
export class UserFormDetail extends BaseEntity {
  @Column()
  descTask: string;

  @Column()
  result: string;

  @Column()
  point: number;

  @OneToOne(() => UserForm, (userForm) => userForm.user) // specify inverse side as a second parameter
  @JoinColumn()
  userForm: UserForm;
}
