import { BaseEntity } from 'src/common/entities/base.entity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

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

  @OneToOne(() => User, { cascade: true })
  @JoinColumn()
  dependant: User;

  @Column()
  password: string;

  @Column({ default: null, nullable: true })
  refreshToken: string;
}