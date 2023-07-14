import { BaseEntity } from 'src/common/entities/base.entity';
import { Permission } from 'src/permission/entities/permission.entity';
import { User } from 'src/user/entities/user.entity';
import { Entity, JoinTable, ManyToMany } from 'typeorm';

@Entity('accessControll')
export class Role extends BaseEntity {
  @ManyToMany(() => User)
  @JoinTable()
  users: User[];

  @ManyToMany(() => Permission)
  @JoinTable()
  permissions: Permission[];

  @ManyToMany(() => Role)
  @JoinTable()
  roles: Role[];
}
