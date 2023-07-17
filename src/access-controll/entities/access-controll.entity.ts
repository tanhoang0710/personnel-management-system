import { BaseEntity } from 'src/common/entities/base.entity';
import { Permission } from 'src/permission/entities/permission.entity';
import { Role } from 'src/role/entities/role.entity';
import { User } from 'src/user/entities/user.entity';
import { Entity, ManyToOne } from 'typeorm';

@Entity('accessControll')
export class AccessControll extends BaseEntity {
  @ManyToOne(() => User, (user) => user.accessControlls)
  user: User;

  @ManyToOne(() => Role, (role) => role.accessControlls)
  role: Role;

  @ManyToOne(() => Permission, (permission) => permission.accessControlls)
  permission: Permission;
}
