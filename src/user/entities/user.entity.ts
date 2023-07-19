import { AccessControll } from 'src/access-controll/entities/access-controll.entity';
import { BaseEntity } from 'src/common/entities/base.entity';
import { UserForm } from 'src/user-form/entities/user-form.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity('users')
export class User extends BaseEntity {
  @Column({ length: 8, unique: true })
  employeeCode: string;

  @Column({ length: 10 })
  firstName: string;

  @Column({ length: 30 })
  lastName: string;

  @Column({ length: 50 })
  email: string;

  @Column({ length: 10 })
  phone: string;

  @Column({ length: 255, nullable: true })
  avatar: string;

  @Column({ length: 15, nullable: true })
  healhInsuranceCode: string;

  @Column({ length: 255 })
  address: string;

  @ManyToOne(() => User, { cascade: true })
  @JoinColumn()
  dependant: User;

  @OneToMany(() => User, (user) => user.dependant)
  dependants: User[];

  @Column()
  password: string;

  @Column({ default: null, nullable: true })
  refreshToken: string;

  @OneToMany(() => AccessControll, (accessControll) => accessControll.user, {
    cascade: true,
  })
  accessControlls: AccessControll[];

  @OneToMany(() => UserForm, (userForm) => userForm.user, {
    cascade: true,
  })
  userForms: UserForm[];
}
