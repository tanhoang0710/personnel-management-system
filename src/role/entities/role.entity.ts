import { BaseEntity } from 'src/common/entities/base.entity';
import { ROLES } from 'src/common/enums/roles.enum';
import { Column, Entity } from 'typeorm';

@Entity('roles')
export class Role extends BaseEntity {
  @Column({ type: 'enum', enum: ROLES, default: ROLES.EMPLOYEE })
  name: ROLES;
}
