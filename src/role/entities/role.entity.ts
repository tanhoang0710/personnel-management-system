import { AccessControll } from 'src/access-controll/entities/access-controll.entity';
import { BaseEntity } from 'src/common/entities/base.entity';
import { ROLES } from 'src/common/enums/roles.enum';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity('roles')
export class Role extends BaseEntity {
  @Column({ type: 'enum', enum: ROLES, default: ROLES.EMPLOYEE })
  name: ROLES;

  @OneToMany(() => AccessControll, (accessControll) => accessControll.role, {
    cascade: true,
  })
  accessControlls: AccessControll[];
}
