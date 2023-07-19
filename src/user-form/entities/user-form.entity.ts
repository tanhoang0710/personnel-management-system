import { BaseEntity } from 'src/common/entities/base.entity';
import { STATUS } from 'src/common/enums/status.enum';
import { Form } from 'src/form/entities/form.entity';
import { UserFormDetail } from 'src/user-form-detail/entities/user-form-detail.entity';
import { User } from 'src/user/entities/user.entity';
import { Column, Entity, ManyToOne, OneToOne } from 'typeorm';

@Entity('userForms')
export class UserForm extends BaseEntity {
  @ManyToOne(() => User, (user) => user.userForms)
  user: User;

  @ManyToOne(() => Form, (form) => form.userForms)
  form: Form;

  @Column({ type: 'text', nullable: true })
  managerComment: string;

  @Column({ type: 'text', nullable: true })
  userComment: string;

  @Column({
    type: 'enum',
    enum: STATUS,
    default: STATUS.NEW,
  })
  status: STATUS;

  @OneToOne(() => UserFormDetail, (userFormDetail) => userFormDetail.userForm)
  userFormDetail: UserFormDetail;
}
